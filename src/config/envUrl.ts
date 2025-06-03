let backendHost:string = 'https://api.github.com/';

/** we can use code below for different environtment */
// const hostname:string = window && window.location && window.location.hostname;
// if ( hostname === 'githubrepoexploler.com' || hostname === 'www.githubrepoexploler.com' ) {  // for Production
//   backendHost = 'https://api.github.com/';
// } else if (hostname === 'qa.githubrepoexploler.com') { // for QA
//   backendHost = 'https://api.github.com/'; 
// } else if (hostname === 'sit.githubrepoexploler.com') { // for SIT
//   backendHost = 'https://api.github.com/';
// } else {// for local
//   backendHost = 'https://api.github.com/';  
// }

export const API_ROOT:string = `${backendHost}`;