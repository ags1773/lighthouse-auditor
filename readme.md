#### Useful Documentation

- [Dealing with variance](https://github.com/GoogleChrome/lighthouse/blob/HEAD/docs/variability.md)

- [Pagespeed API](https://developers.google.com/speed/docs/insights/v5/reference/pagespeedapi/runpagespeed)
  - https://console.developers.google.com/apis/credentials?project=lighthouseaudit-1605091889389

## Measuring webpage performance

#### What is lighthouse?

- It's a piece of code that analyzes web pages by collecting performance metrics
- It can be run
  - from inside chrome dev tools
  - from a Node CLI
  - programatically (as a node module)
- `PageSpeed Insights`, `webdevtest` run lighthouse in lab environments (i.e. runs on some machine having good internet, powerful CPU and adequate memory). So external factors do not skew the results. Note that your locally run lighthouse might [vary from pagespeed insights](https://www.debugbear.com/blog/why-is-my-lighthouse-score-different-from-pagespeed-insights)

#### Pointers to keep in mind:

- Do not run concurrently. This will skew results as your CPU's resources get shared
- Running on inconsistent hardware will lead to inconsistent results
- Isolate your page from third-party influence as much as possible like ad campaigns that load different assets based on campaign
- Make your code behave in a predictable way during testing. If you’ve got an animation that randomly shows up, your performance numbers might be random too
- Isolate your test server from as much network volatility as possible. Use localhost or a machine on the same exact network whenever stability is a concern.
- Isolate your client environment from external influences like anti-virus software and browser extensions.
- Run Lighthouse Multiple Times
