MorphSVGPlugin.convertToPath(' polyline');
TweenLite.defaultOverwrite = false;

var xmlns = "http://www.w3.org/2000/svg",
    xlinkns = "http://www.w3.org/1999/xlink",
    select = function (s) {
        return document.querySelector(s);
    },
    selectAll = function (s) {
        return document.querySelectorAll(s);
    },
    container = select('.containerDiamond'),
    mainSVG = select('.mainSVG'),
    neonGroup = select('.neonGroup'),
    wholeDiamondGroup = select('.wholeDiamondGroup'),
    facetMPath = 'M299,166 L299,244.9,299,435',
    facetLPath = 'M202,165.5 L140,244.5,300,435',
    facetL = select('#facetL'),
    facetR = select('#facetR'),
    facetRPath = 'M300,435 L460,244.5,398,165.5',
    lineMoveL0 = select('#lineMoveL0'),
    lineMoveLRev0 = select('#lineMoveLRev0'),
    lineMoveR0 = select('#lineMoveR0'),
    lineMoveRRev0 = select('#lineMoveRRev0'),
    lineMoveL1 = select('#lineMoveL1'),
    lineMoveRRev1 = select('#lineMoveRRev1'),
    lineMoveR1 = select('#lineMoveR1'),
    sparkleArr = [],
    sparkleCount = 0,
    updateCount = 0,
    updateCountMax = 200

//center the container cos it's pretty an' that
TweenMax.set(container, {
    position: 'absolute',
    top: '50%',
    left: '50%',
    xPercent: -50,
    yPercent: -50
})
TweenMax.set('svg', {
    visibility: 'visible'
})



var mainTl = new TimelineMax();

var l0 = new TimelineMax({ repeat: -1, onUpdate: mainRepeat });
l0.to(lineMoveL0, 2, {

    morphSVG: { shape: facetLPath },
    ease: Linear.easeNone
})
var l1 = new TimelineMax({ repeat: -1 });
l1.to(lineMoveL1, 2, {

    morphSVG: { shape: facetLPath },
    ease: Linear.easeNone
})

var r0 = new TimelineMax({ repeat: -1 });
r0.to(lineMoveR0, 2, {

    morphSVG: { shape: facetMPath },
    ease: Linear.easeNone
})
var r1 = new TimelineMax({ repeat: -1 });
r1.to(lineMoveR1, 2, {

    morphSVG: { shape: facetMPath },
    ease: Linear.easeNone
})

//rev
var lRev0 = new TimelineMax({ repeat: -1 });
lRev0.to(lineMoveLRev0, 2, {

    morphSVG: { shape: facetMPath },
    ease: Linear.easeNone
})
var lRev1 = new TimelineMax({ repeat: -1 });
lRev1.to(lineMoveLRev1, 2, {

    morphSVG: { shape: facetMPath },
    ease: Linear.easeNone
})

var rRev0 = new TimelineMax({ repeat: -1 });
rRev0.to(lineMoveRRev0, 2, {

    morphSVG: { shape: facetRPath },
    ease: Linear.easeNone
})
var rRev1 = new TimelineMax({ repeat: -1 });
rRev1.to(lineMoveRRev1, 2, {

    morphSVG: { shape: facetRPath },
    ease: Linear.easeNone
})

var rShrink = new TimelineMax({ repeat: -1, yoyo: true });
rShrink.to(facetR, 0.5, {

    morphSVG: { shape: '#facetRShrink' },
    ease: Linear.easeNone
})
    .to('#facetTop', 0.5, {
        attr: {
            x2: '-=10'
        },
        ease: Linear.easeNone
    }, '-=0.5')
    .to('#horizontalFacet', 0.5, {
        attr: {
            x2: '-=10'
        },
        ease: Linear.easeNone
    }, '-=0.5')


var lShrink = new TimelineMax({ repeat: -1, yoyo: true });
lShrink.to(facetL, 0.5, {

    morphSVG: { shape: '#facetLShrink' },
    ease: Linear.easeNone
})
    .to('#facetTop', 0.5, {
        attr: {
            x1: '+=10'
        },
        ease: Linear.easeNone
    }, '-=0.5')
    .to('#horizontalFacet', 0.5, {
        attr: {
            x1: '+=10'//,
            //x2:'-=10'
        },
        ease: Linear.easeNone
    }, '-=0.5')

/* TweenMax.to('#facetR', 1, {
  morphSVG:{shape:'#facetRShrink'}
}) */

mainTl.add(lShrink, 0);
mainTl.add(rShrink, 1);
mainTl.add(l0, 0);
mainTl.add(l1, 1);
mainTl.add(r0, 0);
mainTl.add(r1, 1);
mainTl.add(lRev0, 0);
mainTl.add(lRev1, 1);
mainTl.add(rRev0, 0);
mainTl.add(rRev1, 1);

/* TweenMax.fromTo(mainTl, 4, {
  time:4
},{
  time:8,
  ease:Power3.easeInOut,
  repeat:-1,
  yoyo:true
} )
 */


mainTl.seek(30)
mainTl.timeScale(1);

/* TweenMax.to('#gblur', 0.82, {
  attr:{
    //slope:0.3
    stdDeviation:12
  },
  ease:RoughEase.ease.config({ template: Power4.easeInOut, strength: 3, points: 14, taper: "none", randomize: true, clamp: true}),
  repeat:-1,
  yoyo:true
})
 */


for (var i = 0; i < 10; i++) {

    var sparkleTl = new TimelineMax({ paused: true })
    var sparkle = select('#sparkle').cloneNode(true);
    neonGroup.appendChild(sparkle);
    TweenMax.set(sparkle, {
        rotation: randomBetween(0, 45),
        transformOrigin: '50% 50%'
    })


    sparkleTl.fromTo(sparkle.getElementsByTagName('line'), 0.7, {
        drawSVG: '-1% -1%',
        strokeWidth: 6,
        ease: Linear.easeNone
    }, {
        drawSVG: '30% 80%',
        strokeWidth: 4,
        ease: Linear.easeNone
    })
        .to(sparkle.getElementsByTagName('line'), 1, {
            drawSVG: '101% 101%'
        })
        .to(sparkle.getElementsByTagName('line'), 0.8, {
            alpha: 0,
            ease: Power2.easeIn
        }, '-=1')
        .fromTo(sparkle.getElementsByTagName('circle'), 3, {
            attr: {
                r: 0
            }
        }, {
            attr: {
                r: 30
            },
            ease: Sine.easeInOut
        }, '-=1.8')

        .to(sparkle.getElementsByTagName('circle'), 1, {
            alpha: 0,
            ease: Power1.easeIn
        }, '-=1.8')



    sparkleTl.timeScale(1.3)
    sparkleArr.push({ el: sparkle, tl: sparkleTl });

}

function mainRepeat() {
    updateCount++;
    if (updateCount % 32 == !true) {


    } else {

        return;
    }
    var initX = randomBetween(220, 420), initY = randomBetween(150, 260);

    TweenMax.fromTo(sparkleArr[sparkleCount].el, 2, {
        x: initX,
        y: initY,
        rotation: sparkleArr[sparkleCount].el._gsTransform.rotation
    }, {
        x: initX - 150,
        rotation: sparkleArr[sparkleCount].el._gsTransform.rotation + 360,
        ease: Linear.easeNone
    })
    sparkleArr[sparkleCount].tl.play(0);

    sparkleCount++;

    if (sparkleCount >= sparkleArr.length) {

        sparkleCount = 0;
    }



    if (updateCount > updateCountMax) {

        updateCount = 0;
    }
}

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

