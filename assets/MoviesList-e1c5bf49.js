import{j as s,b as d}from"./index-47fe5319.js";import{P as l}from"./Error-6336e3b5.js";const m=({moviesList:a,location:t})=>s.jsx(s.Fragment,{children:s.jsx("ul",{className:"mx-auto grid grid-cols-2 gap-6 p-4 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-7",children:a.map(({id:r,title:o,name:e,poster_path:i,release_date:c})=>s.jsx("li",{className:"h-full w-full rounded-lg border-black p-1 shadow-md shadow-blue-500 transition-transform hover:scale-[1.02]",children:s.jsxs(d,{to:`/movies/${r}`,state:{from:t},children:[i&&s.jsx("img",{src:`https://image.tmdb.org/t/p/w300/${i}`,alt:o??e,className:"rounded-xl object-cover pb-1"}),s.jsxs("h3",{className:"text-xs",children:[o??e," (",c.split("-")[0],")"]})]})},r))})});m.propTypes={location:l.object.isRequired,moviesList:l.array.isRequired};export{m as M};
