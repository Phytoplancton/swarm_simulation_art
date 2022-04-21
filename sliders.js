
createSlider = (number, sliderSettings, func)=> {
    const NewSlider = {}

    var slideContainer = document.createElement('div')
    document.body.appendChild(slideContainer)
    slideContainer.setAttribute('class', 'slidecontainer')
    slideContainer.style.top = Settings.sliderHeight(number)
    var input = document.createElement('input')
    input.setAttribute('class', 'slider')
    input.setAttribute('type','range')
    input.setAttribute('min', sliderSettings.min)
    input.setAttribute('max', sliderSettings.max)
    input.setAttribute('value', sliderSettings.preSetValue)
    slideContainer.appendChild(input)
    var outputSpan = document.createElement('span')
    outputSpan.setAttribute('class', 'text')
    outputSpan.style.color = sliderSettings.color
    slideContainer.appendChild(outputSpan)

    updateOutput = ()=>{
        outputSpan.innerHTML = sliderSettings.text + input.value
        NewSlider.value = input.value * sliderSettings.scale
        func(NewSlider.value, sliderSettings.max)
    }
    updateOutput()
    input.oninput = updateOutput
    
    
    return NewSlider
}


const boidWidth = createSlider(1,Settings.sliderSettings.boidWidth,
    (value)=>{birds.forEach((bird)=>{
        bird.birdWidth = (value + bird.randomVal * 3 )* scale
        bird.birdLength = bird.birdWidth * 3
    })})
const colorHue = createSlider(0,Settings.sliderSettings.colorHue,
    (value, max)=>{birds.forEach((bird)=>{
        bird.birdColor = 
        `hsl(${mod((value - bird.randomVal *( boidWidth.value / 2) * 10), max)}, 100%, ${60 - (boidWidth.value * 2)}%)`
    })})
const boidTrail = createSlider(2,Settings.sliderSettings.boidTrail,
    (value)=>{
        clearCanvasFillstyle = `rgba(0,0,0,${1/value})`
    })


