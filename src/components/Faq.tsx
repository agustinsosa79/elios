import { faq } from '../data/content'
import { Title } from './ui'
import './Faq.css'

export function Faq() {
  return (
    <section id="preguntas" className="section faq" aria-labelledby="faq-title">
      <div className="wrap grid">
        <div className="faq__head">
          <Title id="faq-title" className="t-xl">
            Preguntas frecuentes
          </Title>
        </div>

        <div className="faq__list">
          {faq.map((item, i) => (
            <details key={item.q} className="faq__item" name="faq" open={i === 0} data-reveal>
              <summary>
                <h3 className="serif t-m">{item.q}</h3>
                <span className="faq__icon" aria-hidden="true" />
              </summary>
              <div className="faq__answer">
                <p className="dim">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
