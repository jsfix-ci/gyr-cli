import React from 'react'
declare function require(path: string): {
  container: string;
}
const styles = require('../stylus/login')
console.log(styles, 'styles')
import Hello from '../components/Hello'
export interface MyProps {
  className?: any
}
const ss: any = 'this is a string'
const num: number = (ss as string).length
console.log(ss, num)

/** ---泛型---
 * 泛型支持多种的数据类型
 * 使用any 不确定返回的类型
 * 保持方法的返回值与传入的参数类型相同
 * TypeScript在 .tsx文件里禁用了使用尖括号的类型断言(重要)
 * 为了弥补.tsx里的这个功能，新加入了一个类型断言符号：as
 */

/** ---类型检查（JSX）---
 * 固有元素与基于值的区别(重要)
 * 固有元素即可用环境自带的某些东西（比如，DOM环境里的div或span）固有元素会生成字符串（React.createElement("div")）
 * 基于值的元素会简单的在它所在的作用域里按标识符查找。
 * TypeScript使用与React相同的规范 来区别它们。 固有元素总是以一个小写字母开头，基于值的元素总是以一个大写字母开头。
 */
function identity<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}
const output = identity(['swws'])
console.log(output)
import { Button, Modal } from 'antd'
export default class extends React.Component<MyProps, {}> {
  public state = { visible: false }
  public handleOk() {
    this.setState({
     visible: true
   })
  }
  public handleCancel() {
    this.setState({
      visible: false
    })
  }
  public HandleClick(): void {
    this.handleOk()
  }
  public render() {
    return (
      <div className={styles.container}>
        <h1>Hello man</h1>
        <Button onClick={this.HandleClick.bind(this)} type='primary'>打开</Button>
        <Modal
          title='Basic Modal'
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel.bind(this)}
        >
          <Hello name='man' />
        </Modal>
      </div>
    )
  }
}
