/*
 * Copyright (c) 2021-2022, K4us
 * Author: Raksa Eng <eng.raksa@gmail.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS'
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 **/
const srcPattern = 'src/**/*.ts*';
const khmerChessBase = 'node_modules/khmer-chess/src/**';
const k4usShareBase = 'node_modules/k4us-share/**';

module.exports = function (config) {
    config.set({
        basePath: './',
        frameworks: ['mocha', 'chai', 'karma-typescript'],
        files: [
            { pattern: `${k4usShareBase}/*.ts` },
            { pattern: `${khmerChessBase}/*.ts*` },
            { pattern: srcPattern },
        ],
        exclude: [
            `${khmerChessBase}/*.Spec.ts`,
            `${khmerChessBase}/*.test.ts`,
            `${k4usShareBase}/*.Spec.ts`,
            `${k4usShareBase}/*.test.ts`,
        ],
        preprocessors: {
            [srcPattern]: ['karma-typescript'],
            [`${khmerChessBase}/*.ts*`]: ['karma-typescript'],
            [`${k4usShareBase}/*.ts`]: ['karma-typescript'],
        },
        reporters: ['progress', 'karma-typescript'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity,
        karmaTypescriptConfig: {
            tsconfig: './tsconfig.test.json',
        },
    });
};
