import { FC } from 'react'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
interface CreateCommentProps {
  
}

const CreateComment: FC<CreateCommentProps> = ({}) => {
  return <div className='grid w-full gap-1.5'>
     <Label htmlFor='comment' >Your comment</Label>
     <div className="mt-2">
          <Textarea></Textarea>
     </div>
     
     </div>
}

export default CreateComment