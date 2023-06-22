#include <fstream>
#include <sstream>
#include <filesystem>
#include <rectavalo_io.hpp>

Json::Value io_readFile(std::vector<Json::Value> args) {
  Json::Value response;

  const std::string fname = args[0].asString();

  if (!std::filesystem::exists(fname)) {
    response["error"] = "No such file.";
    return response;
  }

  std::ifstream input(fname);
  if (input) {
    std::ostringstream  stream;
    stream << input.rdbuf();
    response["data"] = stream.str();
  } else {
    response["error"] = "Read failed.";
  }

  return response;
}
