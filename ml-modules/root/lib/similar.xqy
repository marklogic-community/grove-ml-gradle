xquery version "1.0-ml";

module namespace similar = "http://marklogic.com/similar";

import module namespace impl = "http://marklogic.com/appservices/search-impl" at "/MarkLogic/appservices/search/search-impl.xqy";
import module namespace functx = "http://www.functx.com" at "/MarkLogic/functx/functx-1.0-nodoc-2007-01.xqy";
import schema namespace opt = "http://marklogic.com/appservices/search" at "search.xsd";

declare namespace search = "http://marklogic.com/appservices/search";
declare namespace searchdev = "http://marklogic.com/appservices/search/searchdev";
declare default function namespace "http://www.w3.org/2005/xpath-functions";

declare option xdmp:mapping "false";

declare function similar:parse-structured(
        $query-elem as item(),
        $options as element()
)
as schema-element(cts:query)
{
if ($query-elem instance of element(search:query))
then ()
else if ($query-elem instance of element(search:custom-constraint-query))
then let $uri := $query-elem/search:text/text()

let $serialize := <elem>{cts:similar-query(doc($uri))}</elem>
return $serialize/cts:similar-query

else fn:error(xs:QName("ERROR"), "constraint similar error ")

};

