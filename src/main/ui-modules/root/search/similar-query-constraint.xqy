xquery version "1.0-ml";

module namespace constraint = "http://marklogic.com/similar-query-constraint";

declare namespace search = "http://marklogic.com/appservices/search";

declare default function namespace "http://www.w3.org/2005/xpath-functions";

declare option xdmp:mapping "false";

declare function constraint:parse-structured(
  $query-elem as item(),
  $options as element()
) as schema-element(cts:query)
{
  let $uri := $query-elem//(search:text, search:value)/text()
  let $doc := doc($uri)
  return document {
    cts:and-not-query(
      (: find similar matches based on document content, or properties in case of binary :)
      cts:similar-query(
        if ($doc/node() instance of binary()) then
          xdmp:document-properties($uri)
        else
          $doc
      ),
      (: exclude the doc itself from the result list :)
      cts:document-query($uri)
    )
  }/node()
};

