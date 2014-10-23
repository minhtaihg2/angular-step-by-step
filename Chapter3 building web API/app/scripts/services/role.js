/**
 * Created by taipham on 10/22/14.
 */


// cấu hình Roles :


(function (exports) {

    var config = {

        roles: [
            'user',
            'admin'
        ],

        accessLevels: {
            'user': ['user'],
            'admin': ['admin']
        }

    };

    function buildRoles(roles) {
        var bitMask = '01';
        var userRoles = {};

        for (var role in roles) {
            var intCode = parseInt(bitMask, 2);
            userRoles[roles[role]] = {
                bitMask: intCode,
                title: roles[role]
            };
            bitMask = (intCode << 1).toString(2);
        }

        return userRoles;
    }

    function buildAccessLevels(accessLevelDeclarations, userRoles) {

        var accessLevels = {},
            resultBitMask,
            role;
        for (var level in accessLevelDeclarations) {

            if (typeof accessLevelDeclarations[level] === 'string') {
                if (accessLevelDeclarations[level] === '*') {

                    resultBitMask = '';

                    for (role in userRoles) {
                        resultBitMask += '1';
                    }
                    //accessLevels[level] = parseInt(resultBitMask, 2);
                    accessLevels[level] = {
                        bitMask: parseInt(resultBitMask, 2),
                        title: accessLevelDeclarations[level]
                    };
                }
                else {
                    //console.log('Access Control Error: Could not parse ' + accessLevelDeclarations[level] + ' as access definition for level ' + level);
                }
            }
            else {

                resultBitMask = 0;
                for (role in accessLevelDeclarations[level]) {
                    if (userRoles.hasOwnProperty(accessLevelDeclarations[level][role])) {
                        resultBitMask = resultBitMask | userRoles[accessLevelDeclarations[level][role]].bitMask;
                    }
                    else {
                        //console.log('Access Control Error: Could not find role ' + accessLevelDeclarations[level][role] + ' in registered roles while building access for ' + level );
                    }
                }
                accessLevels[level] = {
                    bitMask: resultBitMask,
                    title: accessLevelDeclarations[level][role]
                };
            }
        }

        return accessLevels;
    }


    exports.userRoles = buildRoles(config.roles);
    exports.accessLevels = buildAccessLevels(config.accessLevels, exports.userRoles);

    exports.userCan =
    {
        accessUser: exports.accessLevels.user,
        accessAdmin: exports.accessLevels.admin
    };

})(typeof exports === 'undefined' ? window : exports);