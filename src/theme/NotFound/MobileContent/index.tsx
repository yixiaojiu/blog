import styles from './styles.module.css'
import { useHistory } from '@docusaurus/router'
import Button from '../../components/Button'

export default function MobileContent() {
  const history = useHistory()

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <img
        src="https://s1.hdslb.com/bfs/static/jinkela/long/bitmap/error_01.png"
        alt="parse failed"
        className={styles.img}
        width={300}
      />
      <div className={styles.desc}>
        <span>Σ(oﾟдﾟoﾉ) 无法找到该页面~</span>
      </div>
      <div className="margin-top--md">
        <Button className="margin-right--md" onClick={() => history.goBack()}>
          返回上一页
        </Button>
        <Button onClick={() => history.replace('/')}>回到首页</Button>
      </div>
    </div>
  )
}
