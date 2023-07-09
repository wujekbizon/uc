set wv2i=lib\Microsoft.Web.WebView2.1.0.902.49\build\native\include\
set wil=

clang++ -D_UNICODE -DUNICODE -DWIN32 -D_WINDOWS main.cpp -I%wv2i% -I %