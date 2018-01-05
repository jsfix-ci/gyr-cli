import { Button } from 'antd'
import echarts from 'echarts'
import React from 'react'
import P from '../plugins/alert'

declare module 'react' {
  interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
      s?: string,
      x?: number
  }
}

interface Prop {
  x?: number
}

// declare module 'antd' {
//   interface Button.ButtonProps {
//
//   }
// }

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       CustomButton: { cb: () => void }
//     }
//   }
// }
export interface MyProps {
  className?: any,
  history: object
}
export interface MyState {
  loading: boolean
}

function identity<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}
// 类型推断
identity([1, 2])
// 指定类型
// identity<string>('s' + 2)
// let i = identity

interface CustomButtonProp {
  cb?: (s: string) => void
  onClick?: React.FormEventHandler<any>
}

const CustomButton = (p: CustomButtonProp) => {
  const toClick = () => {
    if (p.cb) {
      p.cb('x')
    }
  }
  return (
    <button onClick={toClick}>点我</button>
  )
}

export default class Login extends React.Component<MyProps, MyState> {
  constructor() {
    super()
    this.state = {
      loading: false
    }
  }
  public componentWillMount() {
    console.log(this.props.history)
  }
  public componentDidMount() {
    const el: any = document.getElementById('test')
    const myChart = echarts.init(el)

       // 指定图表的配置项和数据
    const option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }
    myChart.setOption(option)
  }
  public handleClick() {
    this.setState({
      loading: !this.state.loading
    })
    setTimeout(() => {
      this.setState({
        loading: !this.state.loading
      })
    }, 1000)
  }
  public handleClick2() {
    P.show({
      title: '2',
      content: 'xxx'
    })
  }
  public cb(x: string) {
    alert(x)
    console.log(this, 'this')
  }
  public toClick() {
    console.log(this)
  }
  public render() {
    return (
      <div>
        <div id='main' ref='main'></div>
        <Button type='primary' onClick={this.handleClick.bind(this)} loading={this.state.loading}>
          Loading
        </Button>
        <i className='fa fa-camera-retro fa-lg'></i>
        <button type='button' className='btn btn-default' data-toggle='modal' data-target='#myModal'>
          Launch demo modal
        </button>
        <button type='button' className='btn btn-default' onClick={this.handleClick2.bind(this)}>
          Alert
        </button>
        <hr />
        <CustomButton cb={this.cb.bind(this)}/>
        <div className='modal fade' id='myModal' role='dialog' aria-labelledby='myModalLabel'>
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>&times;</span></button>
                <h4 className='modal-title' id='myModalLabel'>Modal title</h4>
              </div>
              <div className='modal-body'>
                ...
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-default' data-dismiss='modal'>Close</button>
                <button type='button' className='btn btn-primary'>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
// export default Login
