import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {RealtimeDatabaseService} from "./realtime-database.service";
import {object} from "@angular/fire/database";

describe('RealtimeDatabase', () => {
  let service: RealtimeDatabaseService;
  let http: HttpTestingController
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RealtimeDatabaseService]
    })
    service = TestBed.inject(RealtimeDatabaseService);
    http = TestBed.inject(HttpTestingController);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
  })

  afterEach(()=>{
    http.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should get all data', async () => {
   const mockResponse = [
       { id: "OEIugJ7CHTOTGEE68uo", address: 'avc', email: "1@gmail.com", firstName: "pandu", lastName: "windito", phone: "21234t" },
       { id: "OEIxCsYtVPsttEhk_WV", address: 'avc', email: "2@gmail.com", firstName: "pandu2", lastName: "windito2", phone: "21234t" }
     ]
    const result = service.getFormSubmissions()
    const req = http.expectOne("https://training-angular-f0171-default-rtdb.asia-southeast1.firebasedatabase.app/formSubmissions.json")
    expect(req.request.method).toBe('GET')
    req.flush(mockResponse)

    const value = await result
    const object = Object.keys(value).map((key) => [key, value[key]])
    expect(object[0][1].id).toEqual("OEIugJ7CHTOTGEE68uo")
  })

  it('should get data by id', async ()=>{
    const mockResponse = {
      address: "test",
      email: "test@gmail.com",
      firstName: "pandu",
      lastName: "windito",
      phone: "123456789"
    }
    const id = "OEIugJ7CHTOTGEE68uo"
    const result = service.getFormSubmission(id)
    const req = http.expectOne(`https://training-angular-f0171-default-rtdb.asia-southeast1.firebasedatabase.app/formSubmissions/${id}.json`)
    expect(req.request.method).toBe('GET')
    req.flush(mockResponse)

    const value = await result
    expect(value.address).toEqual("test")

  })

})
