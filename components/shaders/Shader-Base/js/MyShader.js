import Common from "./Common"

export default class ArtWorkGL {
    constructor(props) {
        this.props = props
        this.Init()
        
        window.addEventListener('resize', () => {
          Common.ResizeHandler()
        })
    }

    Init() {
        Common.Init(this.props.$canvas, this.props.$container)
    }
}
