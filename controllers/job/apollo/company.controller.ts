import { Request, Response } from 'express';
import axios from 'axios';
import { API_KEYS } from '../../../utils/apiKeys';
import { convertNamesToIds } from '../../../utils/apollo';

export async function searchApolloOrganizations(req:Request, res:Response){
    const {
        organization_name,
        num_employees,
        locations,
        zip_code,
        search_radius,
        keyword_tags,
        page="1",
        industry_tags
    } = req.body
    
    let new_industry_tags = null
    if(industry_tags){
        new_industry_tags = convertNamesToIds(industry_tags)
    }
try{
    const params: Record<string, any> = { page };
    if(organization_name) params.q_organization_name = organization_name
    if (num_employees) params.organization_num_employees_ranges = num_employees;
    if (locations) params.organization_locations = locations;
    if (zip_code) params.zip_code = zip_code;
    if (search_radius) params.organization_location_radius = search_radius;
    if (new_industry_tags) params.organization_industry_tag_ids = new_industry_tags;
    if (keyword_tags) params.q_organization_keyword_tags = keyword_tags;

    // API request options
    const options = {
        method: "GET",
        url: "https://apollo-io-no-cookies-required.p.rapidapi.com/search_organization",
        headers: {
            "x-rapidapi-key": "82c226baedmshc18a75705610913p14b784jsn100ef5455726",
            "x-rapidapi-host": "apollo-io-no-cookies-required.p.rapidapi.com",
            "Content-Type": "application/json"
        },
        params
    };

    // Make API request
    const response = await axios.request(options);

    // Return response data
    res.status(200).json(response.data);

} catch (error: any) {
    console.error("🚨 Apollo.io API Error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
        error: error.response?.data?.message || "Failed to fetch data from Apollo.io"
    });
}
}


export const searchOrganizationsUrl = async (req: Request, res: Response) => {
    const { url, page } = req.body; 
    

    if (!API_KEYS.APPOLLO_API_KEY || !url) {
        res.status(400).json({ error: "API key and URL are required" });
        return;
    }

    const options = {
        method: 'POST',
        url: 'https://apollo-io-no-cookies-required.p.rapidapi.com/search_organizations_via_url',
        headers: {
            'x-rapidapi-key': API_KEYS.APPOLLO_API_KEY,
            'x-rapidapi-host': 'apollo-io-no-cookies-required.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            url,
            page: page || 1
        }
    };

    try {
        const response = await axios.request(options);
        res.json(response.data);
    } catch (error: any) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
};

export const getOrganizationDetails = async (req: Request, res: Response) => {
    const { organization_id } = req.query;
    

    if (!API_KEYS.APPOLLO_API_KEY || !organization_id) {
        res.status(400).json({ error: "API key and organization ID are required" });
        return 
    }

    const options = {
        method: 'GET',
        url: 'https://apollo-io-no-cookies-required.p.rapidapi.com/organization_details',
        params: { organization_id },
        headers: {
            'x-rapidapi-key': API_KEYS.APPOLLO_API_KEY,
            'x-rapidapi-host': 'apollo-io-no-cookies-required.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        res.json(response.data);
    } catch (error: any) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
};


