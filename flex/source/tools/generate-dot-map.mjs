import fs from 'fs'; import {feature} from 'topojson-client'; import {geoContains} from 'd3-geo';
const topo=JSON.parse(fs.readFileSync('node_modules/world-atlas/countries-50m.json'));
const land=feature(topo,topo.objects.land);
const L0=-12,L1=35,B0=27.5,B1=57.5,STEP=0.4,K=Math.cos(42*Math.PI/180),SC=20;
const X=lon=>((lon-L0)*K*SC), Y=lat=>((B1-lat)*SC);
let dots=[];
for(let lat=B1;lat>=B0;lat-=STEP){for(let lon=L0;lon<=L1;lon+=STEP/K*0.86){ if(geoContains(land,[lon,lat])) dots.push([X(lon).toFixed(1),Y(lat).toFixed(1)]); }}
const W=Math.round(X(L1)),H=Math.round(Y(B0));
const cities={london:[-0.13,51.51],paris:[2.35,48.86],lisbon:[-9.14,38.72],berlin:[13.4,52.52],algiers:[3.06,36.75],oran:[-0.64,35.70],constantine:[6.61,36.37],milan:[9.19,45.46],cairo:[31.24,30.04]};
const pins=Object.fromEntries(Object.entries(cities).map(([k,[lo,la]])=>[k,[+X(lo).toFixed(1),+Y(la).toFixed(1)]]));
const path='M'+dots.map(d=>`${d[0]} ${d[1]}h0`).join('M');
fs.writeFileSync(process.argv[2],JSON.stringify({W,H,path,pins,count:dots.length}));
console.log(W,H,dots.length,path.length);
