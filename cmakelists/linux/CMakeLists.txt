# sudo apt-get install libgtkmm-3.0-dev libwebkit2gtk-4.0-dev

set(CMAKE_SYSTEM_NAME Linux)
cmake_minimum_required(VERSION 3.7.0)
project(RECTAVALO_APP)

find_package(PkgConfig REQUIRED) 

pkg_check_modules(WEBKIT_PKG REQUIRED IMPORTED_TARGET webkit2gtk-4.0)
pkg_check_modules(GTKMM_PKG REQUIRED IMPORTED_TARGET gtkmm-3.0)

set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} -O0")
set(CMAKE_CXX_FLAGS_RELEASE "${CMAKE_CXX_FLAGS_RELEASE} -Ofast -MTT")

file(GLOB LINUX_CXX ${CMAKE_SOURCE_DIR}/../../linux/*)
set(CXX "${CMAKE_SOURCE_DIR}/../../cxx")
file(GLOB JSON_SRCS ${CXX}/json)
file(GLOB CXX_SRCS ${CXX}/*.cpp)
file(GLOB CXX_HPPS ${CXX}/*.h ${CXX}/*.hpp)

include_directories(${CMAKE_SOURCE_DIR}/include
  ${CXX}/json
  ${CMAKE_SOURCE_DIR}/../../linux
  ${CXX}
)

add_executable(
  app
  ${LINUX_CXX}
  ${CXX_SRCS}
)

target_link_libraries(app
  PkgConfig::WEBKIT_PKG
  PkgConfig::GTKMM_PKG
)
