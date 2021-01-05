import { TestBed, inject, async, fakeAsync, tick } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import {
    HttpClient,
} from '@angular/common/http';
import { RocketService } from './rocket.service';

const mockRockets = {
    name: "Falcon 9",
    flickr_images: [
        "https://farm1.staticflickr.com/929/28787338307_3453a11a77_b.jpg",
        "https://farm4.staticflickr.com/3955/32915197674_eee74d81bb_b.jpg",
        "https://farm1.staticflickr.com/293/32312415025_6841e30bf1_b.jpg",
        "https://farm1.staticflickr.com/623/23660653516_5b6cb301d1_b.jpg",
        "https://farm6.staticflickr.com/5518/31579784413_d853331601_b.jpg",
        "https://farm1.staticflickr.com/745/32394687645_a9c54a34ef_b.jpg"
    ]
};

describe('Service: RocketService', () => {
    let backend: HttpTestingController;
    let rocketService: RocketService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                RocketService
            ]
        });
        rocketService = TestBed.get(RocketService);
        backend = TestBed.get(HttpTestingController);
    });

    afterEach(inject([HttpTestingController], (_backend: HttpTestingController) => {
        _backend.verify();
    }));

    it('should call the getRocketByIdHttpRequest GET request with success', fakeAsync(() => {
        const id = "5e9d0d95eda69973a809d1ec";
        const url = `https://api.spacexdata.com/v4/rockets/${id}`;

        rocketService.getRocketByIdHttpRequest(id).subscribe((rocket) => {
            expect(rocket.name).toBe('Falcon 9');
            expect(rocket.flickr_images.length).toBe(6);
        });

        const req = backend.expectOne(url);
        expect(req.request.method).toBe('GET');
        req.flush(mockRockets);
        tick();
    }));
});