import { Injectable } from "@angular/core";
import { InterviewsData } from "src/app/core/mocks/data/interviews.data";

@Injectable()
export class MockInterviews {

    public getInterviews() {
        return InterviewsData.INTERVIEWS_LIST;
    }

}
