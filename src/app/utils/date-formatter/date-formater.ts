/*
 *  This class contains functions to generate string for data in different format
 *
 */
export class DateFormater {
    //months: string[] = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    static generateToday(): string {
        let months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        let date = new Date();
        date.setHours(0, 0, 0, 0);
        let dateString = date.getDate() + '-' + months[date.getMonth()] + '-' + date.getFullYear();
        return dateString;
    }
}
