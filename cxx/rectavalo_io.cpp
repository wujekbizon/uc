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

    if (!std::filesystem::exists(path)) {
      response["error"] = "No such file.";
      return response;
    }
    std::ifstream input(path);
    if (input) {
      std::ostringstream  stream;
      stream << input.rdbuf();
      for (auto c : stream.str()) {
        response["result"].append((int)c);
      }
    } else {
      response["error"] = "Read failed.";
    }

    return response;
  }

}
