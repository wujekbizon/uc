@REM Compiling native code makes metro bundler crash (ENOPERM)
cd mobile\android
call gradlew assembleDebug
echo "Now run `cd mobile && npx react-native start` and press a to deploy app"
cd ..\..
