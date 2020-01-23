xquery version "1.0-ml";

module namespace ext = "http://marklogic.com/rest-api/resource/ping";

import module namespace c = "http://marklogic.com/roxy/application-config" at "/config/config.xqy";

declare default function namespace "http://www.w3.org/2005/xpath-functions";

declare option xdmp:mapping "false";

declare
function ext:get(
  $context as map:map,
  $params  as map:map
) as document-node()*
{
  document {
    object-node {
      "backend" : object-node {
        "name": $c:ping-name,
        "version": $c:ping-version
      }
    }
  }
};
