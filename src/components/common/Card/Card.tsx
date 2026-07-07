import {ReactNode} from 'react';

interface Props {
    children: ReactNode;
}

const Card = ({children}: Props) => {
  return (
    <div className="bg-white shadow-sm rounded-xl p-6"> 
        {children}
    </div>
  )
}

export default Card;