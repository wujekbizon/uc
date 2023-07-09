# recreates xcode project
rm -rf _build &&\
  cmake -G Xcode cmakelists/darwin -B_build/darwin -DCMAKE_OSX_SYSROOT=$(xcrun --sdk macosx --show-sdk-path)  &&\
  ./rundarwin.sh

# Doesn't work, uses c++ compiler instead of clang, linker error: "_OBJC_CLASS_$_", referenced from: objc-class-ref in m.o
# rm -rf _build &&\
#  cmake cmakelists/darwin -B_build/darwin -DCMAKE_OSX_SYSROOT=$(xcrun --sdk macosx --show-sdk-path) &&\
#  cmake --build _build/darwin &&\
# ./_build/darwin/app
