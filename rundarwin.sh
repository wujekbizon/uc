# rebuilds app from existing xcode project
pwd
cp mobile/.env.js .
cp assets/bootstrap/boot.html .
cmake --build _build/darwin &&\
  ./_build/darwin/Debug/app
