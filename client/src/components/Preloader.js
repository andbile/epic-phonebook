import React from 'react';
import styled, {keyframes} from 'styled-components'


const bgAnimation = keyframes`
0% {
    fill: #082670;
}
50% {
    fill: #5182f8;
}
100% {
    fill: #082670;
}
`

const StylesPreloader = styled.div`
position: absolute;
display: flex;
flex-direction: column;
align-items: center;
top: calc(50% - 50px);
left: calc(50% - 50px);
width: 120px;
height: 120px;
margin: 0 auto;

& svg{
margin-bottom: 20px;
max-height: 100%;
max-width: 100%;
}

& #preloader{
animation: ${bgAnimation} 2s infinite linear;
}

`

const Preloader = () => {

    return (
        <StylesPreloader>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                 width="1012.000000pt" height="1182.000000pt" viewBox="0 0 1012.000000 1182.000000"
                 preserveAspectRatio="xMidYMid meet">

                <g transform="translate(0.000000,1182.000000) scale(0.100000,-0.100000)"
                   stroke="none" id="preloader">

                    <path d="M4922 11530 c-87 -12 -205 -53 -282 -97 -98 -57 -226 -190 -277 -288
                        -86 -167 -86 -168 -91 -702 l-3 -472 -47 -6 c-26 -4 -123 -22 -217 -41 -1499
                        -297 -2800 -1298 -3484 -2679 -493 -995 -640 -2111 -421 -3205 238 -1190 904
                        -2248 1890 -2999 1063 -811 2458 -1159 3787 -945 1182 190 2264 804 3035 1724
                        536 639 908 1413 1072 2230 71 352 91 574 90 995 0 377 -13 533 -69 855 -177
                        1015 -680 1965 -1428 2696 -709 694 -1553 1140 -2527 1334 l-185 37 -5 484
                        c-5 473 -6 486 -29 554 -69 207 -196 357 -385 452 -123 62 -291 91 -424 73z
                        m-649 -2992 c3 -455 5 -520 21 -573 42 -143 128 -282 225 -366 l51 -44 0 -377
                        0 -377 -902 -3 -903 -3 -68 -27 c-181 -73 -300 -213 -343 -404 -20 -93 -15
                        -192 14 -279 18 -53 2089 -4027 2175 -4174 107 -182 334 -293 536 -264 149 22
                        279 92 361 195 47 58 2172 4103 2219 4222 32 83 40 226 17 316 -51 203 -200
                        354 -401 405 -51 13 -185 15 -937 15 l-878 0 0 373 0 372 88 90 c100 103 159
                        207 192 339 19 74 20 114 20 573 l0 494 38 -7 c91 -16 353 -87 479 -129 501
                        -168 977 -439 1378 -786 148 -128 396 -386 516 -536 488 -611 778 -1305 876
                        -2093 25 -205 25 -715 0 -920 -70 -562 -231 -1062 -495 -1532 -632 -1127
                        -1765 -1896 -3031 -2059 -714 -91 -1449 6 -2093 277 -1285 541 -2202 1679
                        -2452 3044 -47 258 -60 412 -60 730 0 317 12 466 60 730 132 720 451 1384 936
                        1945 208 241 516 516 778 694 382 260 811 458 1236 572 97 26 306 74 336 78 4
                        1 9 -230 11 -511z"/>
                </g>
            </svg>
            Завантаження...
        </StylesPreloader>
    );
};

export default Preloader;