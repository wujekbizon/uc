

set(CMAKE_SYSTEM_NAME Darwin)
cmake_minimum_required(VERSION 3.7.0)
project(RECTAVALO_APP)

macro(ADD_FRAMEWORK fwname appname)
    find_library(FRAMEWORK_${fwname}
    NAMES ${fwname}
    PATHS ${CMAKE_OSX_SYSROOT}/System/Library
    PATH_SUFFIXES Frameworks
    NO_DEFAULT_PATH)
    if( ${FRAMEWORK_${fwname}} STREQUAL FRAMEWORK_${fwname}-NOTFOUND)
        MESSAGE(ERROR ": Framework ${fwname} not found")
    else()
        TARGET_LINK_LIBRARIES(${appname} "${FRAMEWORK_${fwname}}")
        MESSAGE(STATUS "Framework ${fwname} found at ${FRAMEWORK_${fwname}}")
    endif()
endmacro(ADD_FRAMEWORK)

set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} -O0")
set(CMAKE_CXX_FLAGS_RELEASE "${CMAKE_CXX_FLAGS_RELEASE} -Ofast -MTT")

file(GLOB APPLE_M ${CMAKE_SOURCE_DIR}/../../darwin/apptemplate/*)
set(CXX "${CMAKE_SOURCE_DIR}/../../cxx")
file(GLOB JSON_SRCS ${CXX}/json/*)
file(GLOB CXX_SRCS ${CXX}/*.cpp)
file(GLOB CXX_HPPS ${CXX}/*.h ${CXX}/*.hpp)

message(${CMAKE_SOURCE_DIR}/../../../darwin/apptemplate*)

include_directories(${CMAKE_SOURCE_DIR}/include
  ${JSON_SRCS}
  ${APPLE_M}
  ${CXX}
)

add_executable(
  app
  ${APPLE_M}
  ${CXX_SRCS}
)

add_framework(COCOA app)
add_framework(APPKIT app)
add_framework(WEBKIT app)
