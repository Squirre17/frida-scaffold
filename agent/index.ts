import { log } from "./logger.js";

setTimeout(function () {
    Java.perform(function() {
        const packageName = "de.fraunhofer.sit.premiumapp";
        const LauncherActivity = packageName + ".LauncherActivity";
        const license = "LICENSEKEYOK";
        const fakedMac = "0d:00:07:21:00:00";
    
        var lancherActivity = Java.use(LauncherActivity);
    
        // private String getKey()
        lancherActivity.getKey.implementation = function() {
            return license;
        }
    
        lancherActivity.getMac.implementation = function() {
            return fakedMac;
        }

        const libName = 'libnative-lib.so';

        function logic() {
            var funcPtr = Module.findExportByName(libName, "Java_de_fraunhofer_sit_premiumapp_MainActivity_stringFromJNI");
            if(funcPtr === null) {
                throw Error("can't found function")
            }
    
            Interceptor.attach(funcPtr, {
                onEnter(args) {
                    // args无法读取长度 REF: https://github.com/frida/frida/issues/221
                    var Jstring = Java.use("java.lang.String");
                    console.log(args[0])
                    // console.log(args[2].toInt32())
                    // console.log(args[2].readByteArray())
                    console.log(Java.cast(args[2], Jstring))
                    console.log(Java.cast(args[3], Jstring))

                },
                onLeave(retv) {
                    
                }
            })
        }
        // hook runtime load 确保加载成功
        const rtClass = Java.use("java.lang.Runtime");
        // REF: https://cs.android.com/android/platform/superproject/main/+/main:libcore/ojluni/src/main/java/java/lang/Runtime.java;l=1125?q=nativeLoad&ss=android%2Fplatform%2Fsuperproject%2Fmain&hl=zh-cn
        rtClass.nativeLoad.overload(
            'java.lang.String', 
            'java.lang.ClassLoader', 
            "java.lang.String"
        ).implementation = function(...args: any[]) {

            const ret = this.nativeLoad(...args);
            
            if (args[0].indexOf(libName) != -1) {
                logic()
            }
            return ret;
        }
    })
});