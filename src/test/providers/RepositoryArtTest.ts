import RepositoryArt from "../../repository/RepositoryArt";
import { ListApiResponse } from "../../services/server/models/ApiModel";
import ApiResult from "../../services/server/utils/Response";
import Result from "../../utils/GenericResult";

const mockRemoteDataSource = {
    getListArt: jest.fn(),
    getDetailArt: jest.fn(),
};


const mockLocalDataSourceArt = {
    getListFavoriteArt: jest.fn(),
    getDetailArt: jest.fn(),
    saveArt: jest.fn(),
    deleteArt: jest.fn(),
};

const repository = new RepositoryArt(mockRemoteDataSource, mockLocalDataSourceArt);

describe('RepositoryArt', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería llamar a getListArt de remoteDataSource', async () => {
    const mockApiResponse = {};
    mockRemoteDataSource.getListArt.mockResolvedValue(mockApiResponse);
    const result = await repository.getArtList('1');
    expect(mockRemoteDataSource.getListArt).toHaveBeenCalledWith('1');
    expect(result).toBe(mockApiResponse);
  });

  it('debería llamar a getDetailArt de localDataSourceArt si el arte existe localmente', async () => {
   
    const mockLocalArt = {};
    mockLocalDataSourceArt.getDetailArt.mockResolvedValue(mockLocalArt);
    const result = await repository.getDetailArt(123);
    expect(mockLocalDataSourceArt.getDetailArt).toHaveBeenCalledWith(123);
    expect(result).toEqual(new Result(mockLocalArt, null));
  });

  it('debería llamar a getDetailArt de remoteDataSource si el arte no existe localmente', async () => {
    const mockApiResponse:ListApiResponse = {info : null,config: null,pagination: null,data: null}; 
    mockRemoteDataSource.getDetailArt.mockResolvedValue(new ApiResult(mockApiResponse, null));
    mockLocalDataSourceArt.getDetailArt.mockResolvedValue(null);
    const result = await repository.getDetailArt(123);
    expect(mockRemoteDataSource.getDetailArt).toHaveBeenCalledWith(123);
    expect(result).toEqual(new Result(mockApiResponse.data, null));
  });

});