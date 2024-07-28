### How to compile & load

```sh
$ git clone git://github.com/oleavr/frida-agent-example.git
$ cd frida-agent-example/
$ npm install
$ frida -U -f com.example.android --no-pause -l _agent.js
```

### Development workflow

To continuously recompile on change, keep this running in a terminal:

```sh
$ npm run watch
or
$ npm run build
```

And use an editor like Visual Studio Code for code completion and instant
type-checking feedback.

### useful command
```shell

# adb
adb shell pm list packages
adb push .\frida-server-16.4.5-android-x86 /data/local/tmp
```