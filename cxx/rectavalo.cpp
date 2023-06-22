#include <iostream>
#include <string>
#include <vector>
#include <rectavalo.hpp>
#include <rectavalo_io.hpp>
#include <codecvt>
#include <locale>
#ifdef _WIN32
#include <Windows.h>
#endif

std::string value = "Hello from C++!";

#ifdef ANDROID
extern "C" JNIEXPORT jstring JNICALL
Java_com_rectavalo_RectavaloModule_helloNative(
        JNIEnv *env,
        jobject /* this */) {
  return env->NewStringUTF(hello());
}

extern "C" JNIEXPORT jstring JNICALL
Java_com_rectavalo_RectavaloModule_onMessage(
        JNIEnv *env,
        jobject /* this */,
        jstring messageBody) {
  const char *nativeString = env->GetStringUTFChars(messageBody, 0);
  auto result = env->NewStringUTF(onMessage(std::string(nativeString)).c_str());
  env->ReleaseStringUTFChars(messageBody, nativeString);
  return result;
}
#endif

const char* hello() {
  return value.c_str();
}

Json::Value parseJson(const std::string& json) {
  Json::Value root;
  Json::Reader reader;
  reader.parse(json, root);
  return root;
}

#ifdef _WIN32
// Convert a wide Unicode string to an UTF8 string
std::string utf8_encode(const std::wstring& wstr)
{
  if (wstr.empty()) return std::string();
  int size_needed = WideCharToMultiByte(CP_UTF8, 0, &wstr[0], (int)wstr.size(), NULL, 0, NULL, NULL);
  std::string strTo(size_needed, 0);
  WideCharToMultiByte(CP_UTF8, 0, &wstr[0], (int)wstr.size(), &strTo[0], size_needed, NULL, NULL);
  return strTo;
}

// Convert an UTF8 string to a wide Unicode String
std::wstring utf8_decode(const std::string& str)
{
  if (str.empty()) return std::wstring();
  int size_needed = MultiByteToWideChar(CP_UTF8, 0, &str[0], (int)str.size(), NULL, 0);
  std::wstring wstrTo(size_needed, 0);
  MultiByteToWideChar(CP_UTF8, 0, &str[0], (int)str.size(), &wstrTo[0], size_needed);
  return wstrTo;
}
#endif

Json::Value parseJson(const std::wstring& wide) {
  std::string narrow;
#ifndef _WIN32
    using convert_type = std::codecvt_utf8<wchar_t>;
  std::wstring_convert<convert_type, wchar_t> converter;
  //use converter (.to_bytes: wstr->str, .from_bytes: str->wstr)
  narrow = converter.to_bytes(wide);
#else
    narrow = utf8_encode(wide);
  #endif
  return parseJson(narrow);
}


std::string onMessage(const std::string& json) {
  return onMessage(
    parseJson(json)
  );
}

std::wstring onMessage(const std::wstring& wide) {
  std::string s = onMessage(
    parseJson(wide)
  );

  std::wstringstream cls;
  cls << s.c_str();
  return cls.str();
}

std::string json_stringify(const Json::Value json) {
  Json::StreamWriterBuilder wbuilder;
  wbuilder["commentStyle"] = "None";
  wbuilder["indentation"] = "  ";

  return Json::writeString(wbuilder, json);
}

Json::Value jsonOk() {
  Json::Value ok("Ok");
  return ok;
}

Json::Value console_log(const std::vector<Json::Value> args) {
  for (auto value : args) {
    std::cout << value;
  }
  std::cout << std::endl;
  return jsonOk();
}

std::string onMessage(const Json::Value json) {
  /*for (auto member : json.getMemberNames()) {
    std::cout << "onMessage: " << member << std::endl;
    std::cout << "onMessage: " << member << ": " << json[member] << std::endl;
  }*/

  std::string fn;
  int callbackId = -1;
  std::vector<Json::Value> args;
  if (json["fn"].isString()) {
    fn = json["fn"].asString();
  }

  if (json["callbackId"].isIntegral()) {
    callbackId = json["callbackId"].asInt();
  }

  if (json["args"].isArray()) {
    for (unsigned int x = 0; x < json["args"].size(); ++x) {
      args.push_back(json["args"][x]);
    }
  }

  Json::Value response;
  if (fn == "nativeHello") {
    response["nativeResult"] = hello();
  } else if (fn == "console.log") {
    // should supress console response. Logging this response creates an infinite loop.
    response["result"] = console_log(args);
  } else if (fn == "io.readFile") {
    response = io_readFile(args);
  } else {
    response["error"] = "Unknown request: " + fn;
  }

  if (callbackId > -1) response["callbackId"] = callbackId;

  // todo: await response in client side, don't console.log every response (infinite loop)
  // return json_stringify(response);
  return json_stringify(response);
}
