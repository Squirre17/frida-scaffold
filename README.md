# How to compile & load

```sh
$ git clone git://github.com/oleavr/frida-agent-example.git
$ cd frida-agent-example/
$ npm install
$ frida -U -f com.example.android --no-pause -l _agent.js
```

# Development workflow

To continuously recompile on change, keep this running in a terminal:

```sh
$ npm run watch
or
$ npm run build
```

And use an editor like Visual Studio Code for code completion and instant
type-checking feedback.

# useful command
```shell

# adb
adb shell pm list packages
adb push .\assets\frida-server-16.4.5-android-arm64 /data/local/tmp
chmod +x frida-server-16.4.5-android-arm64

./frida-server-16.4.5-android-arm64 &
```
## frida inject process by given pid
```shell
frida -U -p 28445 -l .\script.js
```

## list packages
```shell
adb shell pm list packages | findstr bluetooth
package:com.huawei.bluetooth
package:com.android.bluetoothmidiservice
package:com.android.bluetooth
```

## find process by given pid
```shell
HWEML:/ # ps -A | head -1; ps -A | grep bluetooth
USER           PID  PPID     VSZ    RSS WCHAN            ADDR S NAME
bluetooth      643     1  103504   2640 binder_ioctl_write_read 0 S vendor.huawei.hardware.bluetooth@1.0-service
bluetooth    28445   594 6282464  69580 SyS_epoll_wait      0 S com.android.bluetooth
```

## find process by given opened file
```shell
1|HWEML:/ # lsof | head -1; lsof | grep "libbluetooth"
COMMAND     PID       USER   FD      TYPE             DEVICE  SIZE/OFF       NODE NAME
droid.bluetooth 28445  bluetooth  mem       REG              253,0   5369696   40730024 /system/lib64/libbluetooth.so
droid.bluetooth 28445  bluetooth  mem       REG              253,0    328856   27401305 /system/lib64/libbluetooth_jni.so
droid.bluetooth 28445  bluetooth  mem       REG              253,0     58040   27385460 /system/lib64/libbluetooth-binder.so
```

## find mmap by given pid
```shell
HWEML:/ # cat /proc/28445/maps | grep libbluetooth
7d0cfdc000-7d0d113000 r--p 00000000 fd:00 40730024                       /system/lib64/libbluetooth.so
7d0d113000-7d0d4c6000 --xp 00137000 fd:00 40730024                       /system/lib64/libbluetooth.so
7d0d4c6000-7d0d4c7000 rw-p 004ea000 fd:00 40730024                       /system/lib64/libbluetooth.so
7d0d4c7000-7d0d4d5000 r--p 004eb000 fd:00 40730024                       /system/lib64/libbluetooth.so
7d0da18000-7d0da30000 r--p 00000000 fd:00 27401305                       /system/lib64/libbluetooth_jni.so
7d0da30000-7d0da62000 --xp 00018000 fd:00 27401305                       /system/lib64/libbluetooth_jni.so
7d0da62000-7d0da64000 rw-p 0004a000 fd:00 27401305                       /system/lib64/libbluetooth_jni.so
7d0da64000-7d0da66000 r--p 0004c000 fd:00 27401305                       /system/lib64/libbluetooth_jni.so
```
