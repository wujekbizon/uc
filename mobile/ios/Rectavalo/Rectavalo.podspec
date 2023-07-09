Pod::Spec.new do |s|
  s.name         = "Rectavalo"
  s.version      = "0.0.1"
  s.summary      = "Lib Load code import"
  s.author       = "Michael Ribbons"
  s.homepage     = "https://omnigate.com.au"
  s.license      = "MIT"
  s.platform     = :ios, "13.0"
  s.source       = { :http => 'file:' + __dir__ + '/../../../cxx' }
  s.source_files = ['**/*.{h,hpp,m,mm,cpp}']
  # fixes <json/json.h> import use "quotes" error
  s.header_mappings_dir  = '.'
  s.dependency "React"
  s.pod_target_xcconfig = {
    'CLANG_CXX_LANGUAGE_STANDARD' => "c++20", # required for std::filesystem
  }
  s.script_phase = {
    :name => 'copy files',
    :script => 'cp -R ${PODS_TARGET_SRCROOT}/../../../cxx/* ${PODS_TARGET_SRCROOT} && mkdir -p ${PODS_TARGET_SRCROOT}/include && cp -R ${PODS_TARGET_SRCROOT}/../../../cxx/* ${PODS_TARGET_SRCROOT}/include',
    :execution_position => :before_compile
  }
end
