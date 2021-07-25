import { create } from 'tailwind-rn'
import styles from '../styles.json'

const { tailwind, getColor } = create(styles)
export { getColor }

export default tailwind
