/**
 * Created by WILL on 2017/5/23.
 */
(function () {
    const fs = require('fs');

    function search(dir, key, callback) {
        if (fs.existsSync(dir)) {
            walk('root', dir, 0, function (name, path, level, type) {
                let result = {name, path, type};
                if (type === 'dir') {
                } else {
                    let index = name.lastIndexOf('.');
                    let exname = name.substr(index);
                    result.exname = exname;
                }
                callback(result);
            });

            // fs.readdir(dir, function (err, files) {
            //    if (err) {
            //        console.error(err);
            //        return false;
            //    }
            //    console.log(files);
            //    // for(let item of files) {
            //        // fs.readFile()
            //        // console.log(item);
            //    // }
            // })
        } else {
            console.log('directory not fond');
        }
    }

    function walk(name, path, floor, handleFile) {
        handleFile(name, path, floor, 'dir');
        floor++;
        fs.readdir(path, function (err, files) {
            if (err) {
                console.log('read dir error');
            } else {
                files.forEach(function (item) {
                    let tmpPath = path + '\\' + item;
                    fs.stat(tmpPath, function (err1, stats) {
                        if (err1) {
                            console.log('stat error');
                        } else {
                            if (stats.isDirectory()) {
                                walk(item, tmpPath, floor, handleFile);
                            } else {
                                handleFile(item, tmpPath, floor, 'file');
                            }
                        }
                    })
                });
            }
        });
    }

    exports.search = search;
})();
