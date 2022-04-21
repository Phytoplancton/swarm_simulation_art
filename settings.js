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
        SS.colorHue = S.create1SliderSettings(40,360,205,1,'color hue: ',SS.standardColor)
        SS.boidWidth= S.create1SliderSettings(1,10,5,1,'boid width: ',SS.standardColor)
        SS.boidTrail = S.create1SliderSettings(1,50,5,1,'boid trail lenth: ',SS.standardColor)        

        return SS
    })()

    //sliderplacement
    S.upperSlider = 30
    S.sliderHeight = (number)=>{
        return String(S.upperSlider + number*47) + 'px'
    }

    return S
})()


