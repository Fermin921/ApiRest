const OpenAPISnippet = require('openapi-snippet')

// define input:
fetch("http://localhost:8080/api-docs-json")
    .then(response=>response.json())
        .then(description=>{
            const openApi = description // Open API document
            const targets = ['python_python3', 'c'] // array of targets for code snippets. See list below...
            
            try {
              // either, get snippets for ALL endpoints:
              const results = OpenAPISnippet.getSnippets(openApi, targets) // results is now array of snippets, see "Output" below.
            
              // ...or, get snippets for a single endpoint:
            //const results2 = OpenAPISnippet.getEndpointSnippets(openApi, '/usuarios/{id}', 'get', targets)
            console.log(results)
            } catch (err) {3
            console.log(err)
            }})
