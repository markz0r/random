function writeMCContent() {
  async function renderFileContent(URL) {
    try {
      //remove the RAW_ from the URL
      CLEAN_URL = URL.replace("RAW_", "");
      let response = await fetch(CLEAN_URL);
      let data = await response.text();
      console.log(data);
      let replaceVal = new RegExp(URL, "g");
      let dataElement =
        '<pre class="EnlighterJSRAW" data-enlighter-language="powershell">' +
        data +
        "</pre>";
      console.log(replaceVal);
      document.body.innerHTML = document.body.innerHTML.replace(
        replaceVal,
        dataElement
      );
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function findIncludedRawCodeBlocks() {
    let divs = document.querySelectorAll("div[class^='RAW_']");
    console.log("Raw code blocks found: " + divs.length);
    for (let div of divs) {
      let data = div.innerHTML;
      dataElement =
        '<pre class="EnlighterJSRAW" data-enlighter-language="powershell">' +
        data +
        "</pre>";
      //replace the div with the code block
      div.outerHTML = dataElement;
    }
  }

  function findAllGitHubContentURLs() {
    let regex = /RAW_https:\/\/raw\.githubusercontent\.com\/[^\s"]+/g;
    let urls = document.body.innerHTML.match(regex);
    console.log("Raw githubuser content URLS found: " + urls);
    return urls;
  }
  function initEnlighterJS() {
    EnlighterJS.init("pre", "code", {
      language: "powershell",
      theme: "atomic",
      indent: 2,
    });
  }

  function reloadWindowWithHash() {
    if (!window.location.hash) {
      console.log("hash not found");
      window.location = window.location + "#loaded";
      window.location.reload();
      console.log("reloaded");
    } else {
      console.log("hash found");
      //initEnlighterJS();
    }
  }

  // for each URL, fetch the content and replace the placeholder
  try {
    findIncludedRawCodeBlocks();
    let urls = findAllGitHubContentURLs();
    if (!urls) {
      console.log("No URLs found");
      return;
    } else {
      let fetchPromises = urls.map((url) => renderFileContent(url));
      Promise.all(fetchPromises).then(() => {
        // All fetches have completed
        console.log("All URL content loaded");
        reloadWindowWithHash();
        initEnlighterJS();
      });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    console.log("Finally block");
    reloadWindowWithHash();
    initEnlighterJS();
  }
}
