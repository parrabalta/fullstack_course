import diagonosesData from '../../data/diagnoses'
import { DiagnosesEntry } from '../types'

const diagonoses: DiagnosesEntry[] = diagonosesData as DiagnosesEntry[];

const getDiagnoses = (): DiagnosesEntry[] => {
  return diagonoses;
}


export default getDiagnoses
