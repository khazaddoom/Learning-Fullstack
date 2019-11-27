// // let http =  require('http');

// // let ourApp = http.createServer(function(req, res) {
// //     console.log(req.url);
// //     if (req.url === '/about') {
// //         console.log(res.body);
// //         res.end('This is about us. We do a lot of stuff.');
// //     }
// //     res.end('Hello, welcome to our website.');
// // });

// // ourApp.listen(3000);

// let data = [{
//     country: 'india',
//     team: 'abc'
// },
// {
//     country: 'india',
//     team: 'bcd'
// },
// {
//     country: 'uk',
//     team: 'xyz'
// }];


// groupBy(data, crit => crit.country);

// function groupBy(data, keyGetter) {
//     let val = new Map();

//     data.forEach(item => {
        
//         const temp = keyGetter(item);
//         const collection = val.get(temp);

//         if (!collection) {
//          val.set(temp, [item])   
//         } else {
//             collection.push(item)
//         }

//     });

//     console.log(val)

// }

let color = 'Blue'

if (color === 'blue') {
    console.log('matched')
} else {
    console.log('not matched')
}