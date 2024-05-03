// let targetPage = "https://useragentstring.com/*";
let targetPage = "http://example.com";

function logURL(requestDetails) {
  console.debug(`Now loading: ${requestDetails.url}`);
}

browser.webRequest.onBeforeRequest.addListener(logURL, {
  // urls: ["<all_urls>"],
  urls: [targetPage],
});

// let ua =
//   "Opera/9.80 (X11; Linux i686; Ubuntu/14.10) Presto/2.12.388 Version/12.16";

function injectHeader(e) {
  // e.requestHeaders.forEach((header) => {
  //   if (header.name.toLowerCase() === "user-agent") {
  //     header.value = ua;
  //   }
  // });
  return {
    requestHeaders: [...e.requestHeaders, { name: "foo", value: "bar" }],
  };
}

browser.webRequest.onBeforeSendHeaders.addListener(
  injectHeader,
  {
    urls: [targetPage],
  },
  ["blocking", "requestHeaders"],
);
