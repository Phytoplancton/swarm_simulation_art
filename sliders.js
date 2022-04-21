const Sliders = (()=> {
    const S = {}

    createSlider = (number, SliderSettings)=> {
        const NewSlider = {}

        var slideContainer = document.createElement('div')
        document.body.appendChild(slideContainer)
        slideContainer.setAttribute('class', 'slidecontainer')
        slideContainer.style.top = Settings.sliderHeight(number)
        var input = document.createElement('input')
        input.setAttribute('class', 'slider')
        input.setAttribute('type','range')
        input.setAttribute('min', SliderSettings.min)
        input.setAttribute('max', SliderSettings.max)
        input.setAttribute('value', SliderSettings.preSetValue)
        slideContainer.appendChild(input)
        var outputSpan = document.createElement('span')
        outputSpan.setAttribute('class', 'text')
        outputSpan.style.color = SliderSettings.color
        slideContainer.appendChild(outputSpan)

        updateOutput = ()=>{
            outputSpan.innerHTML = SliderSettings.text + input.value
            NewSlider.value = input.value * SliderSettings.scale
        }
        updateOutput()
        input.oninput = updateOutput
        
        
        return NewSlider
    }


    S.colorHue = createSlider(0,Settings.sliderSettings.colorHue)
    S.boidWidth = createSlider(1,Settings.sliderSettings.boidWidth)
    S.boidTrail = createSlider(2,Settings.sliderSettings.boidTrail)


    return S
})()