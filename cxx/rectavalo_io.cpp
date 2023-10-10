#include <fstream>
#include <sstream>
#include <filesystem>
#include "rectavalo.hpp"
#include <rectavalo_io.hpp>

const std::string READ_FILE = "readfile";

namespace rectavalo::io {
  Json::Value io_onMessage(const std::string fn, const Json::Value json, const std::vector<Json::Value> args) {
    if (fn == READ_FILE) {
      return readfile(json);
    } else {
      return unknownRequest(fn);
    }
  }

  Json::Value readfile(const Json::Value json) {
    Json::Value response;
    validateArg(json, response, "path", Json::stringValue);
    if (hasError(response)) return response;
    auto path = json["path"].asString();

    auto offset = hasArg(json, "offset", Json::intValue) ? json["offset"].asInt() : 0;
    auto bufferLength = hasArg(json, "bufferLength", Json::intValue) ? json["bufferLength"].asInt() : 65535;

    if (!std::filesystem::exists(path)) {
      response["error"] = "No such file.";
      return response;
    }

    char* buffer = new char [bufferLength];

    std::ifstream input(path);
    if (offset == 0) {
      input.seekg(0, input.end);
      response["size"] = (uint64_t)input.tellg();
    }
    
    input.seekg(offset, input.beg);

    if (input) {
      input.read(buffer, bufferLength);
      auto bytes = input ? bufferLength : input.gcount();
      for (int x = 0; x < bytes; x++) {
        response["result"].append((int)buffer[x]);
      }
    } else {
      response["error"] = "Read failed.";
    }

    delete[] buffer;

    return response;
  }

}
