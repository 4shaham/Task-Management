

export default interface IEvens {
    _id:string,
    title: string;
    description: string;
    assignedTo: string[];  
    assignedBy: string;
    startDate:Date,    
    endDate:Date;
    startTime:string;
    endTime:string;
    status:'pending' | 'in-progress' | 'completed';
    createdAt?:Date;
    updatedAt?:Date;
}