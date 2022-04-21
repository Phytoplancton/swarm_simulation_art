const Settings = (()=>{
    const S = {}

    //individual sliders
    S.create1SliderSettings = (min,max,preSetValue,scale,text,color)=>{
        const Sl = {}

        Sl.min = min
        Sl.max = max
        Sl.text = text
        Sl.scale = scale
        Sl.color = color
        Sl.preSetValue = preSetValue

        return Sl
    }
    S.sliderSettings =  (()=>{
        const SS = {}

        SS.standardColor ='rgb(230,230,230)'
        SS.colorHue = S.create1SliderSettings(40,360,205,1,'Farbe: ',SS.standardColor)
        SS.boidWidth= S.create1SliderSettings(1,10,5,1,'Dicke: ',SS.standardColor)
        SS.boidTrail = S.create1SliderSettings(1,100,5,1,'Spurlänge: ',SS.standardColor)        

        return SS
    })()

    //sliderplacement
    S.upperSlider = 30
    S.sliderHeight = (number)=>{
        return String(S.upperSlider + number*47) + 'px'
    }

    return S
})()


