import { log } from "./logger.js";

setTimeout(function () {
    Java.perform(function() {
        
        const packageName = "com.android.bluetooth";
        const libName = 'libbluetooth.so';


        var libsoBase = 0x7b360f047000;
        var SDP_FindServiceInDb = new NativePointer(libsoBase + 0x43BCA0);

        Interceptor.attach(SDP_FindServiceInDb, {
            onEnter(args) {
                const stackAddresses = Thread.backtrace(this.context, Backtracer.ACCURATE);

                // 打印调用栈的地址
                console.log('Call stack addresses : ');
                stackAddresses.forEach(address => {
                    console.log(`0x${address.toString(16)}`);
                });
            },
            onLeave(retv) {
                
            }
        })

    })
});