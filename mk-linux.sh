

rm -rf _build &&\
  mkdir -p _build/linux &&\
  cp assets/bootstrap/boot.html _build/linux &&\
  cmake cmakelists/linux -DDEBUG=1 -B_build/linux &&\
  cd _build/linux && \
  make -j8 app

cp ../../mobile/.env.js .
