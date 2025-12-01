use arcstr::ArcStr;
use rolldown_sourcemap::SourceMap;

#[napi_derive::napi(object, object_to_js = false)]
#[derive(Debug)]
pub struct BindingEmittedPrebuiltChunk {
  pub file_name: String,
  pub code: String,
  pub exports: Option<Vec<String>>,
  pub map: Option<String>,
  pub sourcemap_file_name: Option<String>,
}

impl From<BindingEmittedPrebuiltChunk> for rolldown_common::EmittedPrebuiltChunk {
  fn from(value: BindingEmittedPrebuiltChunk) -> Self {
    Self {
      file_name: ArcStr::from(value.file_name),
      code: value.code,
      exports: value.exports.unwrap_or_default(),
      map: value.map.and_then(|m| SourceMap::from_json_string(&m).ok()),
      sourcemap_filename: value.sourcemap_file_name,
    }
  }
}
