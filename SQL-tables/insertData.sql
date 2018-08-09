INSERT INTO Department (name, service_type) VALUES ('Development', 'Cloud');
INSERT INTO Department (name, service_type) VALUES ('QA', 'On-premises');
INSERT INTO Department (name, service_type) VALUES ('UI', 'Cloud');
INSERT INTO Department (name, service_type) VALUES ('Design', 'On-premises');
INSERT INTO Department (name, service_type) VALUES ('Business Intelligence', 'Cloud');
INSERT INTO Department (name, service_type) VALUES ('Networking', 'Cloud');
INSERT INTO Department (name, service_type) VALUES ('Sales', 'Cloud');
INSERT INTO Department (name, service_type) VALUES ('Production', 'On-premises');
INSERT INTO Department (name, service_type) VALUES ('R&D', 'Cloud');
INSERT INTO Department (name, service_type) VALUES ('Purchasing', 'Cloud');
INSERT INTO Department (name, service_type) VALUES ('Marketing', 'Cloud');
INSERT INTO Department (name, service_type) VALUES ('Human Resource Management', 'On-premises');
INSERT INTO Department (name, service_type) VALUES ('Accounting', 'On-premises');
INSERT INTO Department (name, service_type) VALUES ('Finance', 'On-premises');
INSERT INTO Department (name, service_type) VALUES ('Distribution', 'Cloud');
INSERT INTO Department (name, service_type) VALUES ('Service', 'Cloud');
INSERT INTO Department (name, service_type) VALUES ('Operations', 'Cloud');
INSERT INTO Department (name, service_type) VALUES ('Information Technology', 'Cloud');
INSERT INTO Department (name, service_type) VALUES ('Administration', 'On-premises');
INSERT INTO Department (name, service_type) VALUES ('Legal', 'On-premises');

INSERT INTO Business_Line (name) VALUES ('Consumer Banking');
INSERT INTO Business_Line (name) VALUES ('Small Business Banking');
INSERT INTO Business_Line (name) VALUES ('Mergers & Acquisitions');
INSERT INTO Business_Line (name) VALUES ('Property & Casualty Insurance');
INSERT INTO Business_Line (name) VALUES ('Reinsurance');
INSERT INTO Business_Line (name) VALUES ('Retail Brokerage');
INSERT INTO Business_Line (name) VALUES ('Wealth Management');
INSERT INTO Business_Line (name) VALUES ('Large Accounts');
INSERT INTO Business_Line (name) VALUES ('Document Management');
INSERT INTO Business_Line (name) VALUES ('Tracking');
INSERT INTO Business_Line (name) VALUES ('E-Commerce');
INSERT INTO Business_Line (name) VALUES ('Investments');
INSERT INTO Business_Line (name) VALUES ('Clothing');
INSERT INTO Business_Line (name) VALUES ('Sports Accessories');
INSERT INTO Business_Line (name) VALUES ('Entertainment');
INSERT INTO Business_Line (name) VALUES ('Contracts');
INSERT INTO Business_Line (name) VALUES ('Repairs');
INSERT INTO Business_Line (name) VALUES ('Hiring');
INSERT INTO Business_Line (name) VALUES ('Education');
INSERT INTO Business_Line (name) VALUES ('Shipping');

INSERT INTO Contract_Type (name) VALUES ('Premium');
INSERT INTO Contract_Type (name) VALUES ('Gold');
INSERT INTO Contract_Type (name) VALUES ('Diamond');
INSERT INTO Contract_Type (name) VALUES ('Silver');

INSERT INTO Insurance_Plan (type, rate) VALUES ('Premium', 90);
INSERT INTO Insurance_Plan (type, rate) VALUES ('Silver', 80);
INSERT INTO Insurance_Plan (type, rate) VALUES ('Normal', 70);

INSERT INTO Role (name) VALUES ('Employee');
INSERT INTO Role (name) VALUES ('Manager');
INSERT INTO Role (name) VALUES ('Sales Associate');
INSERT INTO Role (name) VALUES ('Client');

INSERT INTO Province (name) VALUES ('Quebec');
INSERT INTO Province (name) VALUES ('Ontario');
INSERT INTO Province (name) VALUES ('Nova Scotia');
INSERT INTO Province (name) VALUES ('New Brunswick');
INSERT INTO Province (name) VALUES ('Manitoba');
INSERT INTO Province (name) VALUES ('British Columbia');
INSERT INTO Province (name) VALUES ('Prince Edward Island');
INSERT INTO Province (name) VALUES ('Saskatchewan');
INSERT INTO Province (name) VALUES ('Alberta');
INSERT INTO Province (name) VALUES ('Newfoundland and Labrador');
INSERT INTO Province (name) VALUES ('Yukon');
INSERT INTO Province (name) VALUES ('Northwest Territories');
INSERT INTO Province (name) VALUES ('Nunavut');

INSERT INTO City (name, province_name) VALUES ('Montreal', 'Quebec');
INSERT INTO City (name, province_name) VALUES ('Quebec City', 'Quebec');
INSERT INTO City (name, province_name) VALUES ('Alma', 'Quebec');
INSERT INTO City (name, province_name) VALUES ('Amos', 'Quebec');
INSERT INTO City (name, province_name) VALUES ('Amqui', 'Quebec');
INSERT INTO City (name, province_name) VALUES ('Asbestos', 'Quebec');
INSERT INTO City (name, province_name) VALUES ('Baie-Comeau', 'Quebec');
INSERT INTO City (name, province_name) VALUES ('Bromont', 'Quebec');
INSERT INTO City (name, province_name) VALUES ('Boucherville', 'Quebec');
INSERT INTO City (name, province_name) VALUES ('Brownsburg-Chatam', 'Quebec');
INSERT INTO City (name, province_name) VALUES ('Chibougamau', 'Quebec');
INSERT INTO City (name, province_name) VALUES ('Drummondville', 'Quebec');
INSERT INTO City (name, province_name) VALUES ('Estérel', 'Quebec');
INSERT INTO City (name, province_name) VALUES ('Gaspé', 'Quebec');
INSERT INTO City (name, province_name) VALUES ('Granby', 'Quebec');
INSERT INTO City (name, province_name) VALUES ('Saint-Hyacinthe', 'Quebec');
INSERT INTO City (name, province_name) VALUES ('Saint-Jérôme', 'Quebec');
INSERT INTO City (name, province_name) VALUES ('Saint-Joseph-de-Beauce', 'Quebec');
INSERT INTO City (name, province_name) VALUES ('Saint-Sauveur', 'Quebec');
INSERT INTO City (name, province_name) VALUES ('Thetford Mines', 'Quebec');

INSERT INTO City (name, province_name) VALUES ('Ottawa', 'Ontario');
INSERT INTO City (name, province_name) VALUES ('Toronto', 'Ontario');
INSERT INTO City (name, province_name) VALUES ('Barrie', 'Ontario');
INSERT INTO City (name, province_name) VALUES ('Belleville', 'Ontario');
INSERT INTO City (name, province_name) VALUES ('Brampton', 'Ontario');
INSERT INTO City (name, province_name) VALUES ('Brant', 'Ontario');
INSERT INTO City (name, province_name) VALUES ('Brockville', 'Ontario');
INSERT INTO City (name, province_name) VALUES ('Burlington', 'Ontario');
INSERT INTO City (name, province_name) VALUES ('Cambridge', 'Ontario');
INSERT INTO City (name, province_name) VALUES ('Caledon', 'Ontario');
INSERT INTO City (name, province_name) VALUES ('Cornwall', 'Ontario');
INSERT INTO City (name, province_name) VALUES ('Dryden', 'Ontario');
INSERT INTO City (name, province_name) VALUES ('Elliot Lake', 'Ontario');
INSERT INTO City (name, province_name) VALUES ('Guelph', 'Ontario');
INSERT INTO City (name, province_name) VALUES ('Haldimand County', 'Ontario');
INSERT INTO City (name, province_name) VALUES ('Hamilton', 'Ontario');
INSERT INTO City (name, province_name) VALUES ('Kenora', 'Ontario');
INSERT INTO City (name, province_name) VALUES ('Kingston', 'Ontario');
INSERT INTO City (name, province_name) VALUES ('Kitchener', 'Ontario');
INSERT INTO City (name, province_name) VALUES ('London', 'Ontario');

INSERT INTO City (name, province_name) VALUES ('Halifax', 'Nova Scotia');
INSERT INTO City (name, province_name) VALUES ('Amherst', 'Nova Scotia');
INSERT INTO City (name, province_name) VALUES ('Antigonish', 'Nova Scotia');
INSERT INTO City (name, province_name) VALUES ('Berwick', 'Nova Scotia');
INSERT INTO City (name, province_name) VALUES ('Digby', 'Nova Scotia');
INSERT INTO City (name, province_name) VALUES ('Kentville', 'Nova Scotia');
INSERT INTO City (name, province_name) VALUES ('Lockeport', 'Nova Scotia');
INSERT INTO City (name, province_name) VALUES ('Lunenburg', 'Nova Scotia');
INSERT INTO City (name, province_name) VALUES ('Middleton', 'Nova Scotia');
INSERT INTO City (name, province_name) VALUES ('Mulgrave', 'Nova Scotia');
INSERT INTO City (name, province_name) VALUES ('Oxford', 'Nova Scotia');
INSERT INTO City (name, province_name) VALUES ('Pictou', 'Nova Scotia');
INSERT INTO City (name, province_name) VALUES ('Stellarton', 'Nova Scotia');
INSERT INTO City (name, province_name) VALUES ('Shelburne', 'Nova Scotia');
INSERT INTO City (name, province_name) VALUES ('Stewiacke', 'Nova Scotia');
INSERT INTO City (name, province_name) VALUES ('Trenton', 'Nova Scotia');
INSERT INTO City (name, province_name) VALUES ('Truro', 'Nova Scotia');
INSERT INTO City (name, province_name) VALUES ('Westville', 'Nova Scotia');
INSERT INTO City (name, province_name) VALUES ('Windsor', 'Nova Scotia');
INSERT INTO City (name, province_name) VALUES ('Wolfville', 'Nova Scotia');

INSERT INTO City (name, province_name) VALUES ('Moncton', 'New Brunswick');
INSERT INTO City (name, province_name) VALUES ('Bathurst', 'New Brunswick');
INSERT INTO City (name, province_name) VALUES ('Campbellton', 'New Brunswick');
INSERT INTO City (name, province_name) VALUES ('Dieppe', 'New Brunswick');
INSERT INTO City (name, province_name) VALUES ('Edmunston', 'New Brunswick');
INSERT INTO City (name, province_name) VALUES ('Fredericton', 'New Brunswick');
INSERT INTO City (name, province_name) VALUES ('Miramichi', 'New Brunswick');
INSERT INTO City (name, province_name) VALUES ('Saint John', 'New Brunswick');
INSERT INTO City (name, province_name) VALUES ('Hampton', 'New Brunswick');
INSERT INTO City (name, province_name) VALUES ('Hartland', 'New Brunswick');
INSERT INTO City (name, province_name) VALUES ('Lamèque', 'New Brunswick');
INSERT INTO City (name, province_name) VALUES ('Nackawic', 'New Brunswick');
INSERT INTO City (name, province_name) VALUES ('Oromocto', 'New Brunswick');
INSERT INTO City (name, province_name) VALUES ('Quispamsis', 'New Brunswick');
INSERT INTO City (name, province_name) VALUES ('Richibucto', 'New Brunswick');
INSERT INTO City (name, province_name) VALUES ('Riverview', 'New Brunswick');
INSERT INTO City (name, province_name) VALUES ('Rothesay', 'New Brunswick');
INSERT INTO City (name, province_name) VALUES ('Sackville', 'New Brunswick');
INSERT INTO City (name, province_name) VALUES ('Dalhousie', 'New Brunswick');

INSERT INTO City (name, province_name) VALUES ('Winnipeg', 'Manitoba');
INSERT INTO City (name, province_name) VALUES ('Brandon', 'Manitoba');
INSERT INTO City (name, province_name) VALUES ('Dauphin', 'Manitoba');
INSERT INTO City (name, province_name) VALUES ('Flin Flon', 'Manitoba');
INSERT INTO City (name, province_name) VALUES ('Morden', 'Manitoba');
INSERT INTO City (name, province_name) VALUES ('Portage la Prairie', 'Manitoba');
INSERT INTO City (name, province_name) VALUES ('Selkirk', 'Manitoba');
INSERT INTO City (name, province_name) VALUES ('Steinbach', 'Manitoba');
INSERT INTO City (name, province_name) VALUES ('Thompson', 'Manitoba');
INSERT INTO City (name, province_name) VALUES ('Winkler', 'Manitoba');
INSERT INTO City (name, province_name) VALUES ('Altona', 'Manitoba');
INSERT INTO City (name, province_name) VALUES ('Carberry', 'Manitoba');
INSERT INTO City (name, province_name) VALUES ('Carman', 'Manitoba');
INSERT INTO City (name, province_name) VALUES ('Gillam', 'Manitoba');
INSERT INTO City (name, province_name) VALUES ('Melita', 'Manitoba');
INSERT INTO City (name, province_name) VALUES ('Morris', 'Manitoba');
INSERT INTO City (name, province_name) VALUES ('Snow Lake', 'Manitoba');
INSERT INTO City (name, province_name) VALUES ('Stonewall', 'Manitoba');
INSERT INTO City (name, province_name) VALUES ('Teulon', 'Manitoba');
INSERT INTO City (name, province_name) VALUES ('Virden', 'Manitoba');

INSERT INTO City (name, province_name) VALUES ('Victoria', 'British Columbia');
INSERT INTO City (name, province_name) VALUES ('Vancouver', 'British Columbia');
INSERT INTO City (name, province_name) VALUES ('Richmond', 'British Columbia');
INSERT INTO City (name, province_name) VALUES ('Abbotsford', 'British Columbia');
INSERT INTO City (name, province_name) VALUES ('Armstrong', 'British Columbia');
INSERT INTO City (name, province_name) VALUES ('Burnaby', 'British Columbia');
INSERT INTO City (name, province_name) VALUES ('Castlegar', 'British Columbia');
INSERT INTO City (name, province_name) VALUES ('Chilliwack', 'British Columbia');
INSERT INTO City (name, province_name) VALUES ('Colwood', 'British Columbia');
INSERT INTO City (name, province_name) VALUES ('Courtenay', 'British Columbia');
INSERT INTO City (name, province_name) VALUES ('Cranbrook', 'British Columbia');
INSERT INTO City (name, province_name) VALUES ('Dawson Creek', 'British Columbia');
INSERT INTO City (name, province_name) VALUES ('Duncan', 'British Columbia');
INSERT INTO City (name, province_name) VALUES ('Enderby', 'British Columbia');
INSERT INTO City (name, province_name) VALUES ('Fernie', 'British Columbia');
INSERT INTO City (name, province_name) VALUES ('Kamloops', 'British Columbia');
INSERT INTO City (name, province_name) VALUES ('Kelowna', 'British Columbia');
INSERT INTO City (name, province_name) VALUES ('Langford', 'British Columbia');
INSERT INTO City (name, province_name) VALUES ('Parksville', 'British Columbia');
INSERT INTO City (name, province_name) VALUES ('Penticton', 'British Columbia');

INSERT INTO City (name, province_name) VALUES ('Charlottetown', 'Prince Edward Island');
INSERT INTO City (name, province_name) VALUES ('Summerside', 'Prince Edward Island');
INSERT INTO City (name, province_name) VALUES ('Alberton', 'Prince Edward Island');
INSERT INTO City (name, province_name) VALUES ('Cornwall', 'Prince Edward Island');
INSERT INTO City (name, province_name) VALUES ('Georgetown', 'Prince Edward Island');
INSERT INTO City (name, province_name) VALUES ('Kensington', 'Prince Edward Island');
INSERT INTO City (name, province_name) VALUES ('Montague', 'Prince Edward Island');
INSERT INTO City (name, province_name) VALUES ('North Rustico', 'Prince Edward Island');
INSERT INTO City (name, province_name) VALUES ('Souris', 'Prince Edward Island');
INSERT INTO City (name, province_name) VALUES ('Statford', 'Prince Edward Island');
INSERT INTO City (name, province_name) VALUES ('Tignish', 'Prince Edward Island');
INSERT INTO City (name, province_name) VALUES ('Afton', 'Prince Edward Island');
INSERT INTO City (name, province_name) VALUES ('Alexandra', 'Prince Edward Island');
INSERT INTO City (name, province_name) VALUES ('Belfast', 'Prince Edward Island');
INSERT INTO City (name, province_name) VALUES ('Bonshaw', 'Prince Edward Island');
INSERT INTO City (name, province_name) VALUES ('Brackley', 'Prince Edward Island');
INSERT INTO City (name, province_name) VALUES ('Brudenell', 'Prince Edward Island');
INSERT INTO City (name, province_name) VALUES ('Cardigan', 'Prince Edward Island');
INSERT INTO City (name, province_name) VALUES ('Crapaud', 'Prince Edward Island');
INSERT INTO City (name, province_name) VALUES ('Hazelbrook', 'Prince Edward Island');

INSERT INTO City (name, province_name) VALUES ('Regina', 'Saskatchewan');
INSERT INTO City (name, province_name) VALUES ('Saskatoon', 'Saskatchewan');
INSERT INTO City (name, province_name) VALUES ('Moose Jaw', 'Saskatchewan');
INSERT INTO City (name, province_name) VALUES ('Left Noob', 'Saskatchewan');
INSERT INTO City (name, province_name) VALUES ('Estevan', 'Saskatchewan');
INSERT INTO City (name, province_name) VALUES ('Humboldt', 'Saskatchewan');
INSERT INTO City (name, province_name) VALUES ('Martensville', 'Saskatchewan');
INSERT INTO City (name, province_name) VALUES ('Meadow Lake', 'Saskatchewan');
INSERT INTO City (name, province_name) VALUES ('Melfort', 'Saskatchewan');
INSERT INTO City (name, province_name) VALUES ('Melville', 'Saskatchewan');
INSERT INTO City (name, province_name) VALUES ('North Battleford', 'Saskatchewan');
INSERT INTO City (name, province_name) VALUES ('Prince Albert', 'Saskatchewan');
INSERT INTO City (name, province_name) VALUES ('Swift Current', 'Saskatchewan');
INSERT INTO City (name, province_name) VALUES ('Warman', 'Saskatchewan');
INSERT INTO City (name, province_name) VALUES ('Weyburn', 'Saskatchewan');
INSERT INTO City (name, province_name) VALUES ('Yorkton', 'Saskatchewan');
INSERT INTO City (name, province_name) VALUES ('Aberdeen', 'Saskatchewan');
INSERT INTO City (name, province_name) VALUES ('Alameda', 'Saskatchewan');
INSERT INTO City (name, province_name) VALUES ('Allan', 'Saskatchewan');
INSERT INTO City (name, province_name) VALUES ('Arborfield', 'Saskatchewan');

INSERT INTO City (name, province_name) VALUES ('Edmonton', 'Alberta');
INSERT INTO City (name, province_name) VALUES ('Calgary', 'Alberta');
INSERT INTO City (name, province_name) VALUES ('Airdrie', 'Alberta');
INSERT INTO City (name, province_name) VALUES ('Camrose', 'Alberta');
INSERT INTO City (name, province_name) VALUES ('Lacombe', 'Alberta');
INSERT INTO City (name, province_name) VALUES ('Leduc', 'Alberta');
INSERT INTO City (name, province_name) VALUES ('Medicine Hat', 'Alberta');
INSERT INTO City (name, province_name) VALUES ('Red Deer', 'Alberta');
INSERT INTO City (name, province_name) VALUES ('Spruce Grove', 'Alberta');
INSERT INTO City (name, province_name) VALUES ('St. Albert', 'Alberta');
INSERT INTO City (name, province_name) VALUES ('Wetaskiwin', 'Alberta');
INSERT INTO City (name, province_name) VALUES ('Lloyminster', 'Alberta');
INSERT INTO City (name, province_name) VALUES ('Lethbridge', 'Alberta');
INSERT INTO City (name, province_name) VALUES ('Grande Prairie', 'Alberta');
INSERT INTO City (name, province_name) VALUES ('Fort Saskatchewan', 'Alberta');
INSERT INTO City (name, province_name) VALUES ('Cold Lake', 'Alberta');
INSERT INTO City (name, province_name) VALUES ('Chestermere', 'Alberta');
INSERT INTO City (name, province_name) VALUES ('Brooks', 'Alberta');
INSERT INTO City (name, province_name) VALUES ('Drumheller', 'Alberta');
INSERT INTO City (name, province_name) VALUES ('Strathcona', 'Alberta');

INSERT INTO City (name, province_name) VALUES ('St. Johns', 'Newfoundland and Labrador');
INSERT INTO City (name, province_name) VALUES ('Labrador City', 'Newfoundland and Labrador');
INSERT INTO City (name, province_name) VALUES ('Corner Brook', 'Newfoundland and Labrador');
INSERT INTO City (name, province_name) VALUES ('Mount Pearl', 'Newfoundland and Labrador');
INSERT INTO City (name, province_name) VALUES ('Anchor Point', 'Newfoundland and Labrador');
INSERT INTO City (name, province_name) VALUES ('Appleton', 'Newfoundland and Labrador');
INSERT INTO City (name, province_name) VALUES ('Aquaforte', 'Newfoundland and Labrador');
INSERT INTO City (name, province_name) VALUES ('Avondale', 'Newfoundland and Labrador');
INSERT INTO City (name, province_name) VALUES ('Badger', 'Newfoundland and Labrador');
INSERT INTO City (name, province_name) VALUES ('Baie Verte', 'Newfoundland and Labrador');
INSERT INTO City (name, province_name) VALUES ('Baine Harbour', 'Newfoundland and Labrador');
INSERT INTO City (name, province_name) VALUES ('Bauline', 'Newfoundland and Labrador');
INSERT INTO City (name, province_name) VALUES ('Bay Bulls', 'Newfoundland and Labrador');
INSERT INTO City (name, province_name) VALUES ('Baytona', 'Newfoundland and Labrador');
INSERT INTO City (name, province_name) VALUES ('Bellburns', 'Newfoundland and Labrador');
INSERT INTO City (name, province_name) VALUES ('Cormack', 'Newfoundland and Labrador');
INSERT INTO City (name, province_name) VALUES ('Cow Head', 'Newfoundland and Labrador');
INSERT INTO City (name, province_name) VALUES ('Fortune', 'Newfoundland and Labrador');
INSERT INTO City (name, province_name) VALUES ('Fogo Island', 'Newfoundland and Labrador');
INSERT INTO City (name, province_name) VALUES ('Gambo', 'Newfoundland and Labrador');

INSERT INTO City (name, province_name) VALUES ('Carmacks', 'Yukon');
INSERT INTO City (name, province_name) VALUES ('Dawson', 'Yukon');
INSERT INTO City (name, province_name) VALUES ('Faro', 'Yukon');
INSERT INTO City (name, province_name) VALUES ('Haines Junction', 'Yukon');
INSERT INTO City (name, province_name) VALUES ('Mayo', 'Yukon');
INSERT INTO City (name, province_name) VALUES ('Teslin', 'Yukon');
INSERT INTO City (name, province_name) VALUES ('Watson Lake', 'Yukon');
INSERT INTO City (name, province_name) VALUES ('Whitehorse', 'Yukon');
INSERT INTO City (name, province_name) VALUES ('Aishihik', 'Yukon');
INSERT INTO City (name, province_name) VALUES ('Barlow', 'Yukon');
INSERT INTO City (name, province_name) VALUES ('Black Hills', 'Yukon');
INSERT INTO City (name, province_name) VALUES ('Calumet', 'Yukon');
INSERT INTO City (name, province_name) VALUES ('Caribou', 'Yukon');
INSERT INTO City (name, province_name) VALUES ('Conrad', 'Yukon');
INSERT INTO City (name, province_name) VALUES ('De Wette', 'Yukon');
INSERT INTO City (name, province_name) VALUES ('Dominion', 'Yukon');
INSERT INTO City (name, province_name) VALUES ('Flat Creek', 'Yukon');
INSERT INTO City (name, province_name) VALUES ('Klondike', 'Yukon');
INSERT INTO City (name, province_name) VALUES ('Lorne', 'Yukon');
INSERT INTO City (name, province_name) VALUES ('Minto', 'Yukon');

INSERT INTO City (name, province_name) VALUES ('Yellowknife', 'Northwest Territories');
INSERT INTO City (name, province_name) VALUES ('Colville Lake', 'Northwest Territories');
INSERT INTO City (name, province_name) VALUES ('Deline', 'Northwest Territories');
INSERT INTO City (name, province_name) VALUES ('Dettah', 'Northwest Territories');
INSERT INTO City (name, province_name) VALUES ('Enterprise', 'Northwest Territories');
INSERT INTO City (name, province_name) VALUES ('Fort Good Hope', 'Northwest Territories');
INSERT INTO City (name, province_name) VALUES ('Fort Liard', 'Northwest Territories');
INSERT INTO City (name, province_name) VALUES ('Fort McPherson', 'Northwest Territories');
INSERT INTO City (name, province_name) VALUES ('Fort Providence', 'Northwest Territories');
INSERT INTO City (name, province_name) VALUES ('Fort Simpson', 'Northwest Territories');
INSERT INTO City (name, province_name) VALUES ('Fort Smith', 'Northwest Territories');
INSERT INTO City (name, province_name) VALUES ('Gamèti', 'Northwest Territories');
INSERT INTO City (name, province_name) VALUES ('Hay River', 'Northwest Territories');
INSERT INTO City (name, province_name) VALUES ('Inuvik', 'Northwest Territories');
INSERT INTO City (name, province_name) VALUES ('Kakisa', 'Northwest Territories');
INSERT INTO City (name, province_name) VALUES ('Paulatuk', 'Northwest Territories');
INSERT INTO City (name, province_name) VALUES ('Tulita', 'Northwest Territories');
INSERT INTO City (name, province_name) VALUES ('Wrigley', 'Northwest Territories');

INSERT INTO City (name, province_name) VALUES ('Iqaluit', 'Nunavut');
INSERT INTO City (name, province_name) VALUES ('Arctic Bay', 'Nunavut');
INSERT INTO City (name, province_name) VALUES ('Arviat', 'Nunavut');
INSERT INTO City (name, province_name) VALUES ('Baker Lake', 'Nunavut');
INSERT INTO City (name, province_name) VALUES ('Bathurst Inlet', 'Nunavut');
INSERT INTO City (name, province_name) VALUES ('Cambridge Bay', 'Nunavut');
INSERT INTO City (name, province_name) VALUES ('Cape Dorset', 'Nunavut');
INSERT INTO City (name, province_name) VALUES ('Chesterfield Inlet', 'Nunavut');
INSERT INTO City (name, province_name) VALUES ('Clyde River', 'Nunavut');
INSERT INTO City (name, province_name) VALUES ('Coral Harbour', 'Nunavut');
INSERT INTO City (name, province_name) VALUES ('Gjoa Haven', 'Nunavut');
INSERT INTO City (name, province_name) VALUES ('Grise Fiord', 'Nunavut');
INSERT INTO City (name, province_name) VALUES ('Hall Beach', 'Nunavut');
INSERT INTO City (name, province_name) VALUES ('Igloolik', 'Nunavut');
INSERT INTO City (name, province_name) VALUES ('Kimmirut', 'Nunavut');
INSERT INTO City (name, province_name) VALUES ('Kugaaruk', 'Nunavut');
INSERT INTO City (name, province_name) VALUES ('Kugluktuk', 'Nunavut');
INSERT INTO City (name, province_name) VALUES ('Nanisivik', 'Nunavut');
INSERT INTO City (name, province_name) VALUES ('Naujaat', 'Nunavut');
INSERT INTO City (name, province_name) VALUES ('Pangnirtung', 'Nunavut');

INSERT INTO User (username, password, is_admin, role) VALUES ('admin', 'admin', TRUE, 'Manager');
INSERT INTO User (username, password, is_admin, role) VALUES ('funnybunny', 'pw12345', FALSE, 'Sales Associate');
INSERT INTO User (username, password, is_admin, role) VALUES ('carldatank', 'exquizit', FALSE, 'Sales Associate');
INSERT INTO User (username, password, is_admin, role) VALUES ('anita69', 'pw12345', FALSE, 'Sales Associate');
INSERT INTO User (username, password, is_admin, role) VALUES ('curious', 'password', TRUE, 'Manager');
INSERT INTO User (username, password, is_admin, role) VALUES ('manager', 'manager', FALSE, 'Manager');
INSERT INTO User (username, password, is_admin, role) VALUES ('man02', 'pw12345', FALSE, 'Manager');
INSERT INTO User (username, password, is_admin, role) VALUES ('man03', 'pw12345', FALSE, 'Manager');
INSERT INTO User (username, password, is_admin, role) VALUES ('man04', 'pw12345', FALSE, 'Manager');
INSERT INTO User (username, password, is_admin, role) VALUES ('man05', 'pw12345', FALSE, 'Manager');
INSERT INTO User (username, password, is_admin, role) VALUES ('man06', 'pw12345', FALSE, 'Manager');
INSERT INTO User (username, password, is_admin, role) VALUES ('man07', 'pw12345', FALSE, 'Manager');
INSERT INTO User (username, password, is_admin, role) VALUES ('man08', 'pw12345', FALSE, 'Manager');
INSERT INTO User (username, password, is_admin, role) VALUES ('man09', 'pw12345', FALSE, 'Manager');
INSERT INTO User (username, password, is_admin, role) VALUES ('man10', 'pw12345', FALSE, 'Manager');
INSERT INTO User (username, password, is_admin, role) VALUES ('man11', 'pw12345', FALSE, 'Manager');
INSERT INTO User (username, password, is_admin, role) VALUES ('man12', 'pw12345', FALSE, 'Manager');
INSERT INTO User (username, password, is_admin, role) VALUES ('man13', 'pw12345', FALSE, 'Manager');
INSERT INTO User (username, password, is_admin, role) VALUES ('man14', 'pw12345', FALSE, 'Manager');
INSERT INTO User (username, password, is_admin, role) VALUES ('man15', 'pw12345', FALSE, 'Manager');
INSERT INTO User (username, password, is_admin, role) VALUES ('man16', 'pw12345', FALSE, 'Manager');
INSERT INTO User (username, password, is_admin, role) VALUES ('man17', 'pw12345', FALSE, 'Manager');
INSERT INTO User (username, password, is_admin, role) VALUES ('man18', 'pw12345', FALSE, 'Manager');
INSERT INTO User (username, password, is_admin, role) VALUES ('man19', 'pw12345', FALSE, 'Manager');
INSERT INTO User (username, password, is_admin, role) VALUES ('man20', 'pw12345', FALSE, 'Manager');
INSERT INTO User (username, password, is_admin, role) VALUES ('employee', 'employee', FALSE, 'Employee');
INSERT INTO User (username, password, is_admin, role) VALUES ('emp02', 'pw12345', FALSE, 'Employee');
INSERT INTO User (username, password, is_admin, role) VALUES ('emp03', 'pw12345', FALSE, 'Employee');
INSERT INTO User (username, password, is_admin, role) VALUES ('emp04', 'pw12345', FALSE, 'Employee');
INSERT INTO User (username, password, is_admin, role) VALUES ('emp05', 'pw12345', FALSE, 'Employee');
INSERT INTO User (username, password, is_admin, role) VALUES ('emp06', 'pw12345', FALSE, 'Employee');
INSERT INTO User (username, password, is_admin, role) VALUES ('emp07', 'pw12345', FALSE, 'Employee');
INSERT INTO User (username, password, is_admin, role) VALUES ('emp08', 'pw12345', FALSE, 'Employee');
INSERT INTO User (username, password, is_admin, role) VALUES ('emp09', 'pw12345', FALSE, 'Employee');
INSERT INTO User (username, password, is_admin, role) VALUES ('emp10', 'pw12345', FALSE, 'Employee');
INSERT INTO User (username, password, is_admin, role) VALUES ('emp11', 'pw12345', FALSE, 'Employee');
INSERT INTO User (username, password, is_admin, role) VALUES ('emp12', 'pw12345', FALSE, 'Employee');
INSERT INTO User (username, password, is_admin, role) VALUES ('emp13', 'pw12345', FALSE, 'Employee');
INSERT INTO User (username, password, is_admin, role) VALUES ('emp14', 'pw12345', FALSE, 'Employee');
INSERT INTO User (username, password, is_admin, role) VALUES ('emp15', 'pw12345', FALSE, 'Employee');
INSERT INTO User (username, password, is_admin, role) VALUES ('emp16', 'pw12345', FALSE, 'Employee');
INSERT INTO User (username, password, is_admin, role) VALUES ('emp17', 'pw12345', FALSE, 'Employee');
INSERT INTO User (username, password, is_admin, role) VALUES ('emp18', 'pw12345', FALSE, 'Employee');
INSERT INTO User (username, password, is_admin, role) VALUES ('emp19', 'pw12345', FALSE, 'Employee');
INSERT INTO User (username, password, is_admin, role) VALUES ('emp20', 'pw12345', FALSE, 'Employee');
INSERT INTO User (username, password, is_admin, role) VALUES ('client', 'client', FALSE, 'Client');
INSERT INTO User (username, password, is_admin, role) VALUES ('client02', 'pw12345', FALSE, 'Client');
INSERT INTO User (username, password, is_admin, role) VALUES ('client03', 'pw12345', FALSE, 'Client');
INSERT INTO User (username, password, is_admin, role) VALUES ('client04', 'pw12345', FALSE, 'Client');
INSERT INTO User (username, password, is_admin, role) VALUES ('client05', 'pw12345', FALSE, 'Client');
INSERT INTO User (username, password, is_admin, role) VALUES ('client06', 'pw12345', FALSE, 'Client');
INSERT INTO User (username, password, is_admin, role) VALUES ('client07', 'pw12345', FALSE, 'Client');
INSERT INTO User (username, password, is_admin, role) VALUES ('client08', 'pw12345', FALSE, 'Client');
INSERT INTO User (username, password, is_admin, role) VALUES ('client09', 'pw12345', FALSE, 'Client');
INSERT INTO User (username, password, is_admin, role) VALUES ('client10', 'pw12345', FALSE, 'Client');
INSERT INTO User (username, password, is_admin, role) VALUES ('client11', 'pw12345', FALSE, 'Client');
INSERT INTO User (username, password, is_admin, role) VALUES ('client12', 'pw12345', FALSE, 'Client');
INSERT INTO User (username, password, is_admin, role) VALUES ('client13', 'pw12345', FALSE, 'Client');
INSERT INTO User (username, password, is_admin, role) VALUES ('client14', 'pw12345', FALSE, 'Client');
INSERT INTO User (username, password, is_admin, role) VALUES ('client15', 'pw12345', FALSE, 'Client');
INSERT INTO User (username, password, is_admin, role) VALUES ('client16', 'pw12345', FALSE, 'Client');
INSERT INTO User (username, password, is_admin, role) VALUES ('client17', 'pw12345', FALSE, 'Client');
INSERT INTO User (username, password, is_admin, role) VALUES ('client18', 'pw12345', FALSE, 'Client');
INSERT INTO User (username, password, is_admin, role) VALUES ('client19', 'pw12345', FALSE, 'Client');
INSERT INTO User (username, password, is_admin, role) VALUES ('client20', 'pw12345', FALSE, 'Client');

INSERT INTO Sales_Associate (first_name, last_name, id) VALUES ('Rebecca', 'Styles', 2);
INSERT INTO Sales_Associate (first_name, last_name, id) VALUES ('Carl', 'Chance', 3);
INSERT INTO Sales_Associate (first_name, last_name, id) VALUES ('Anita', 'Lachance', 4);

INSERT INTO Client (name, email_domain, province_name, city, address, postal_code, id) VALUES ('GSC Corporation', 'gsc.ca', 'Quebec', 'Montreal', '123 Maisonneuve O.', 'H0H0H0', 46);
INSERT INTO Client (name, email_domain, province_name, city, address, postal_code, id) VALUES ('Nike', 'nike.ca', 'Ontario', 'Ottawa', '123 Maisonneuve O.', 'H0H0H0', 47);
INSERT INTO Client (name, email_domain, province_name, city, address, postal_code, id) VALUES ('Adidas', 'fakeemail.ca', 'Quebec', 'Montreal', '123 Maisonneuve O.', 'H0H0H0', 48);
INSERT INTO Client (name, email_domain, province_name, city, address, postal_code, id) VALUES ('Jell-O', 'fakeemail.ca', 'New Brunswick', 'Moncton', '123 Maisonneuve O.', 'H0H0H0', 49);
INSERT INTO Client (name, email_domain, province_name, city, address, postal_code, id) VALUES ('WWE', 'fakeemail.ca', 'Manitoba', 'Winnipeg', '123 Maisonneuve O.', 'H0H0H0', 50);
INSERT INTO Client (name, email_domain, province_name, city, address, postal_code, id) VALUES ('Honda', 'fakeemail.ca', 'British Columbia', 'Victoria', '123 Maisonneuve O.', 'H0H0H0', 51);
INSERT INTO Client (name, email_domain, province_name, city, address, postal_code, id) VALUES ('BMW', 'fakeemail.ca', 'Prince Edward Island', 'Charlottetown', '123 Maisonneuve O.', 'H0H0H0', 52);
INSERT INTO Client (name, email_domain, province_name, city, address, postal_code, id) VALUES ('Logitech', 'fakeemail.ca', 'Saskatchewan', 'Regina', '123 Maisonneuve O.', 'H0H0H0', 53);
INSERT INTO Client (name, email_domain, province_name, city, address, postal_code, id) VALUES ('Dell', 'fakeemail.ca', 'Alberta', 'Edmonton', '123 Maisonneuve O.', 'H0H0H0', 54);
INSERT INTO Client (name, email_domain, province_name, city, address, postal_code, id) VALUES ('Apple', 'fakeemail.ca', 'Newfoundland and Labrador', 'St. Johns', '123 Maisonneuve O.', 'H0H0H0', 55);
INSERT INTO Client (name, email_domain, province_name, city, address, postal_code, id) VALUES ('Zimbabwe Wool', 'fakeemail.ca', 'Yukon', 'Whitehorse', '123 Maisonneuve O.', 'H0H0H0', 56);
INSERT INTO Client (name, email_domain, province_name, city, address, postal_code, id) VALUES ('Rustech', 'fakeemail.ca', 'Northwest Territories', 'Yellowknife', '123 Maisonneuve O.', 'H0H0H0', 57);
INSERT INTO Client (name, email_domain, province_name, city, address, postal_code, id) VALUES ('Nintendo', 'fakeemail.ca', 'Nunavut', 'Iqaluit', '123 Maisonneuve O.', 'H0H0H0', 58);
INSERT INTO Client (name, email_domain, province_name, city, address, postal_code, id) VALUES ('D-Link', 'fakeemail.ca', 'Quebec', 'Montreal', '123 Maisonneuve O.', 'H0H0H0', 59);
INSERT INTO Client (name, email_domain, province_name, city, address, postal_code, id) VALUES ('C-Link', 'fakeemail.ca', 'Quebec', 'Montreal', '123 Maisonneuve O.', 'H0H0H0', 60);
INSERT INTO Client (name, email_domain, province_name, city, address, postal_code, id) VALUES ('G-Link', 'fakeemail.ca', 'Quebec', 'Montreal', '123 Maisonneuve O.', 'H0H0H0', 61);
INSERT INTO Client (name, email_domain, province_name, city, address, postal_code, id) VALUES ('Z-Link', 'fakeemail.ca', 'Quebec', 'Montreal', '123 Maisonneuve O.', 'H0H0H0', 62);
INSERT INTO Client (name, email_domain, province_name, city, address, postal_code, id) VALUES ('Motorola', 'fakeemail.ca', 'Ontario', 'Ottawa', '123 Maisonneuve O.', 'H0H0H0', 63);
INSERT INTO Client (name, email_domain, province_name, city, address, postal_code, id) VALUES ('Steeringwheelola', 'fakeemail.ca', 'Ontario', 'Ottawa', '123 Maisonneuve O.', 'H0H0H0', 64);
INSERT INTO Client (name, email_domain, province_name, city, address, postal_code, id) VALUES ('Leatherseatola', 'fakeemail.ca','Nova Scotia', 'Halifax', '123 Maisonneuve O.', 'H0H0H0', 65);

INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Dave', 'Gold', 1, 'Premium', 'Quebec', 6, 'Premium');
INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Dan', 'Goldi', 2, 'Premium', 'Quebec', 7, 'Premium');
INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Kevin', 'Goldie', 3, 'Premium', 'Quebec', 8, 'Premium');
INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Carl', 'Golden', 4, 'Premium', 'Quebec', 9, 'Premium');
INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Carl', 'Goldo', 5, 'Premium', 'Ontario', 10, 'Premium');
INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Karl', 'Golder', 6, 'Silver', 'Ontario', 11, 'Premium');
INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Karl', 'Goldust', 7, 'Silver', 'Nunavut', 12, 'Premium');
INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Ckarl', 'Goldawaka', 8, 'Silver', 'Northwest Territories', 13, 'Premium');
INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Ckarl', 'Gold-Silver', 9, 'Silver', 'Yukon', 14, 'Gold');
INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Carrl', 'Goldink', 10, 'Silver', 'Newfoundland and Labrador', 15, 'Gold');
INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Carrl', 'Goldan', 11, 'Normal', 'Alberta', 16, 'Gold');
INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Carlie', 'Gold', 12, 'Normal', 'Saskatchewan', 17, 'Gold');
INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Karlie', 'Gold', 13, 'Normal', 'Saskatchewan', 18, 'Gold');
INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Karly', 'Gold-Meyers', 14, 'Normal', 'Prince Edward Island', 19, 'Gold');
INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Carl-E', 'Android', 15, 'Normal', 'British Columbia', 20, 'Gold');
INSERT INTO Employee (first_name, last_name, department_id, province_name, id, contract_type_preference) VALUES ('Car-Lee', 'Lee', 16, 'Manitoba', 21, 'Gold');
INSERT INTO Employee (first_name, last_name, department_id, province_name, id, contract_type_preference) VALUES ('Car', 'Lee', 17, 'New Brunswick', 22, 'Gold');
INSERT INTO Employee (first_name, last_name, department_id, province_name, id, contract_type_preference) VALUES ('Lamar', 'LeFunk', 18, 'Nova Scotia', 23, 'Gold');
INSERT INTO Employee (first_name, last_name, department_id, province_name, id, contract_type_preference) VALUES ('LaQwonda', 'GaNeesha', 19, 'Nova Scotia', 24, 'Gold');
INSERT INTO Employee (first_name, last_name, department_id, province_name, id, contract_type_preference) VALUES ('Felicia', 'Kitty', 20, 'Nova Scotia', 25, 'Diamond');
INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Steve', 'Gold', 1, 'Premium', 'Quebec', 26, 'Diamond');
INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Steeve', 'Gold', 2, 'Premium', 'Ontario', 27, 'Diamond');
INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Steeeve', 'Gold', 3, 'Premium', 'Nova Scotia', 28, 'Diamond');
INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Steeeeve', 'Gold', 4, 'Premium', 'New Brunswick', 29, 'Diamond');
INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Steeeeeve', 'Gold', 5, 'Premium', 'Manitoba', 30, 'Diamond');
INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Steeeeeeve', 'Gold', 6, 'Silver', 'British Columbia', 31, 'Diamond');
INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Stevee', 'Gold', 7, 'Silver', 'Prince Edward Island', 32, 'Diamond');
INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Steveee', 'Gold', 8, 'Silver', 'Saskatchewan', 33, 'Diamond');
INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Steveeee', 'Gold', 9, 'Silver', 'Alberta', 34, 'Diamond');
INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Steveeeee', 'Gold', 10, 'Silver', 'Newfoundland and Labrador', 35, 'Diamond');
INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Steveeeeee', 'Gold', 11, 'Normal', 'Yukon', 36, 'Diamond');
INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Steevee', 'Gold', 12, 'Normal', 'Northwest Territories', 37, 'Diamond');
INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Steeevee', 'Gold', 13, 'Normal', 'Nunavut', 38, 'Diamond');
INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Steeveee', 'Gold', 14, 'Normal', 'Quebec', 39 , 'Silver');
INSERT INTO Employee (first_name, last_name, department_id, insurance_type, province_name, id, contract_type_preference) VALUES ('Steeeveee', 'Gold', 15, 'Normal', 'Quebec', 40, 'Silver');
INSERT INTO Employee (first_name, last_name, department_id, province_name, id, contract_type_preference) VALUES ('Steeeeveee', 'Gold', 16, 'Quebec', 41, 'Silver');
INSERT INTO Employee (first_name, last_name, department_id, province_name, id, contract_type_preference) VALUES ('Steeeveeee', 'Gold', 17, 'Quebec', 42, 'Silver');
INSERT INTO Employee (first_name, last_name, department_id, province_name, id, contract_type_preference) VALUES ('Steeeeveeee', 'Gold', 18, 'Ontario', 43, 'Silver');
INSERT INTO Employee (first_name, last_name, department_id, province_name, id, contract_type_preference) VALUES ('Steven', 'Gold', 19, 'Ontario', 44, 'Silver');
INSERT INTO Employee (first_name, last_name, department_id, province_name, id, contract_type_preference) VALUES ('Stephen', 'Gold', 20, 'Ontario', 45, 'Silver');

INSERT INTO Works_In (client_id, business_line) VALUES (46, 'Contracts');
INSERT INTO Works_In (client_id, business_line) VALUES (47, 'Repairs');
INSERT INTO Works_In (client_id, business_line) VALUES (48, 'Hiring');
INSERT INTO Works_In (client_id, business_line) VALUES (49, 'Education');
INSERT INTO Works_In (client_id, business_line) VALUES (50, 'Shipping');
INSERT INTO Works_In (client_id, business_line) VALUES (51, 'Contracts');
INSERT INTO Works_In (client_id, business_line) VALUES (52, 'Repairs');
INSERT INTO Works_In (client_id, business_line) VALUES (53, 'Hiring');
INSERT INTO Works_In (client_id, business_line) VALUES (54, 'Education');
INSERT INTO Works_In (client_id, business_line) VALUES (55, 'Shipping');
INSERT INTO Works_In (client_id, business_line) VALUES (56, 'Contracts');
INSERT INTO Works_In (client_id, business_line) VALUES (57, 'Repairs');
INSERT INTO Works_In (client_id, business_line) VALUES (58, 'Hiring');
INSERT INTO Works_In (client_id, business_line) VALUES (59, 'Education');
INSERT INTO Works_In (client_id, business_line) VALUES (60, 'Shipping');
INSERT INTO Works_In (client_id, business_line) VALUES (61, 'Contracts');
INSERT INTO Works_In (client_id, business_line) VALUES (62, 'Repairs');
INSERT INTO Works_In (client_id, business_line) VALUES (63, 'Hiring');
INSERT INTO Works_In (client_id, business_line) VALUES (64, 'Education');
INSERT INTO Works_In (client_id, business_line) VALUES (65, 'Shipping');

INSERT INTO Manager (id, email, phone_number, middle_initial) VALUES (6, 'a@a.a', '514-555-5555', 'G');
INSERT INTO Manager (id, email, phone_number, middle_initial) VALUES (7, 'a@a.a', '514-555-5555', 'H');
INSERT INTO Manager (id, email, phone_number, middle_initial) VALUES (8, 'a@a.a', '514-555-5555', 'G');
INSERT INTO Manager (id, email, phone_number, middle_initial) VALUES (9, 'a@a.a', '514-555-5555', 'Z');
INSERT INTO Manager (id, email, phone_number) VALUES (10, 'a@a.a', '514-555-5555');
INSERT INTO Manager (id, email, phone_number) VALUES (11, 'a@a.a', '514-555-5555');
INSERT INTO Manager (id, email, phone_number) VALUES (12, 'a@a.a', '514-555-5555');
INSERT INTO Manager (id, email, phone_number, middle_initial) VALUES (13, 'a@a.a', '514-555-5555', 'B');
INSERT INTO Manager (id, email, phone_number, middle_initial) VALUES (14, 'a@a.a', '514-555-5555', 'K');
INSERT INTO Manager (id, email, phone_number) VALUES (15, 'a@a.a', '514-555-5555');
INSERT INTO Manager (id, email, phone_number) VALUES (16, 'a@a.a', '514-555-5555');
INSERT INTO Manager (id, email, phone_number) VALUES (17, 'a@a.a', '514-555-5555');
INSERT INTO Manager (id, email, phone_number, middle_initial) VALUES (18, 'a@a.a', '514-555-5555', 'M');
INSERT INTO Manager (id, email, phone_number, middle_initial) VALUES (19, 'a@a.a', '514-555-5555', 'G');
INSERT INTO Manager (id, email, phone_number, middle_initial) VALUES (20, 'a@a.a', '514-555-5555', 'C');
INSERT INTO Manager (id, email, phone_number, middle_initial) VALUES (21, 'a@a.a', '514-555-5555', 'A');
INSERT INTO Manager (id, email, phone_number) VALUES (22, 'a@a.a', '514-555-5555');
INSERT INTO Manager (id, email, phone_number) VALUES (23, 'a@a.a', '514-555-5555');
INSERT INTO Manager (id, email, phone_number) VALUES (24, 'a@a.a', '514-555-5555');
INSERT INTO Manager (id, email, phone_number) VALUES (25, 'a@a.a', '514-555-5555');

INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Mankini Swimsuit', 1345678.75, 123478, 4, FALSE, '2017-1-04', 10, 1, 21, 46, 'Contracts', 'Premium');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Concordia CMS', 1234678.75, 123678, 4, FALSE, '2017-2-04', 8, 2, 22, 47, 'Repairs', 'Premium');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Concordia other thing', 2345678.75, 125678.75, 4, FALSE, '2017-3-04', 10, 3, 23, 48, 'Hiring', 'Premium');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Contracto', 12345678.75, 123678.50, 4, FALSE, '2017-4-04', 8, 4, 24, 49, 'Education', 'Premium');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Graduation project', 1234568.75, 234678.25, 4, FALSE, '2017-5-04', 5, 25, 50,'Shipping', 'Premium');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Hello kitty doll', 12345678.75, 134578.75, 4, FALSE, '2017-6-04', 6, 6, 6, 51, 'Contracts', 'Diamond');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Bubblegum plans', 1234578.75, 123458, 4, FALSE, '2017-7-04', 7, 7, 7, 52, 'Repairs', 'Diamond');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Microsoft hacking plot', 1235678.75, 125678, 2, FALSE, '2017-7-04', 8, 8, 8, 53, 'Hiring', 'Diamond');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Modem theft', 1234678.75, 125678, 2, FALSE, '2017-7-04', 10, 9, 9, 54, 'Education', 'Diamond');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Fake moon landing video shoot', 1234568.75, 123478, 2, FALSE, '2017-7-04', 10, 10, 55, 'Shipping', 'Diamond');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Lens-free camera', 1245678.75, 123456, 2, FALSE, '2017-7-04', 10, 11, 11 ,56, 'Contracts', 'Gold');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Loose tights', 1235678.75, 145678, 2, FALSE, '2017-7-04', 10, 12, 12 ,57, 'Repairs', 'Gold');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Faux fauxhawk', 1234678.75, 125678, 2, FALSE, '2017-7-04', 10, 13, 13 ,58, 'Hiring', 'Gold');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Screen-less laptop', 1345678.75, 123458, 3, FALSE, '2017-7-04', 10, 14, 14 ,59, 'Education', 'Gold');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Keyboard-less laptop', 1235678.75, 123678.75, 3, FALSE, '2017-7-04', 15, 15 ,60, 'Shipping', 'Gold');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Trackpad-less laptop', 1234568.75, 145678.75, 3, FALSE, '2017-8-04', 9, 16, 16 ,61, 'Contracts', 'Silver');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Battery-less laptop', 1234578.75, 145678.75, 3, FALSE, '2017-9-04', 5, 17, 17 ,62, 'Repairs', 'Silver');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Non-portable laptop', 1245678.75, 345678.75, 3, FALSE, '2017-10-04', 7, 18, 18 ,63, 'Hiring', 'Silver');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Batteries for slingshot', 1235678.75, 123478.75, 3, FALSE, '2017-11-04', 10, 19, 19 ,64, 'Education', 'Silver');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Unlockable lock', 2345678.75, 123467.75, 3, FALSE, '2017-12-04', 20, 20 ,65, 'Shipping', 'Silver');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Gorilla skin Swimsuit', 1345678.75, 123478, 4, FALSE, '2017-1-04', 10, 1, 21, 46, 'Contracts', 'Premium');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('McGill CMS', 1234678.75, 123678, 4, FALSE, '2017-2-04', 8, 2, 22, 46, 'Contracts', 'Premium');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('McGill other thing', 2345678.75, 125678.75, 4, FALSE, '2017-3-04', 10, 3, 23, 47, 'Repairs', 'Premium');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Contractos', 12345678.75, 123678.50, 4, FALSE, '2017-4-04', 8, 4, 24, 47, 'Repairs', 'Premium');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Demotion project', 1234568.75, 234678.25, 4, FALSE, '2017-5-04', 5, 25, 47,'Repairs', 'Premium');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Hello chicken doll', 12345678.75, 134578.75, 4, FALSE, '2017-6-04', 6, 6, 6, 48, 'Hiring', 'Diamond');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Bazooka Joe videogame', 1234578.75, 123458, 4, FALSE, '2017-7-04', 7, 7, 7, 48, 'Hiring', 'Diamond');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Apple hacking plot', 1235678.75, 125678, 2, FALSE, '2017-7-04', 8, 8, 8, 48, 'Hiring', 'Diamond');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Router theft', 1234678.75, 125678, 2, FALSE, '2017-7-04', 10, 9, 9, 48, 'Hiring', 'Diamond');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Fake sun landing video shoot', 1234568.75, 123478, 2, FALSE, '2017-7-04', 4, 10, 49, 'Education', 'Diamond');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Cardboard window project', 1245678.75, 123456, 2, FALSE, '2017-7-04', 10, 11, 11 ,49, 'Education', 'Gold');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Zipper tightener', 1235678.75, 145678, 2, FALSE, '2017-7-04', 7, 12, 12 ,49, 'Education', 'Gold');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Real fauxhawk', 1234678.75, 125678, 2, FALSE, '2017-7-04', 3, 13, 13 ,49, 'Education', 'Gold');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Ikea in a box', 1345678.75, 123458, 3, FALSE, '2017-7-04', 10, 14, 14 ,49, 'Education', 'Gold');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Brothless soup', 1235678.75, 123678.75, 3, FALSE, '2017-7-04', 15, 15 ,50, 'Shipping', 'Gold');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Pre-filled Agenda', 1234568.75, 145678.75, 3, FALSE, '2017-8-04', 8, 16, 16 ,50, 'Shipping', 'Silver');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Sane glue', 1234578.75, 145678.75, 3, FALSE, '2017-9-04', 5, 17, 17 ,50, 'Shipping', 'Silver');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Electric shovel', 1245678.75, 345678.75, 3, FALSE, '2017-10-04', 7, 18, 18 ,50, 'Shipping', 'Silver');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, client_satisfaction, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Cricket steroids', 1235678.75, 123478.75, 3, FALSE, '2017-11-04', 9, 19, 19 ,50, 'Shipping', 'Silver');
INSERT INTO Contract (name, acv, initial_amount, recorded_by, is_active, start_date, department_id, manager_id, client_id, business_line, contract_type)
VALUES ('Unisock', 2345678.75, 123467.75, 3, FALSE, '2017-12-04', 20, 20 ,50, 'Shipping', 'Silver');

INSERT INTO Deliverable (deliv_number, is_final, days_to_delivery, days_taken, is_active, contract_id) VALUES (1, FALSE, 3 , 3, FALSE,1);
INSERT INTO Deliverable (deliv_number, is_final, days_to_delivery, days_taken, is_active, contract_id) VALUES (2, FALSE, 5 , 5, FALSE,1);
INSERT INTO Deliverable (deliv_number, is_final, days_to_delivery, days_taken, is_active, contract_id) VALUES (3, TRUE , 10, 10, FALSE,1);
INSERT INTO Deliverable (deliv_number, is_final, days_to_delivery, days_taken, is_active, contract_id) VALUES (1, FALSE, 6 , 5, FALSE,6);
INSERT INTO Deliverable (deliv_number, is_final, days_to_delivery, days_taken, is_active, contract_id) VALUES (2, FALSE, 11, 10, FALSE,6);
INSERT INTO Deliverable (deliv_number, is_final, days_to_delivery, days_taken, is_active, contract_id) VALUES (3, TRUE , 18, 16, FALSE,6);
INSERT INTO Deliverable (deliv_number, is_final, days_to_delivery, days_taken, is_active, contract_id) VALUES (1, FALSE, 8 , 9, FALSE,11);
INSERT INTO Deliverable (deliv_number, is_final, days_to_delivery, days_taken, is_active, contract_id) VALUES (2, FALSE, 14, 18, FALSE,11);
INSERT INTO Deliverable (deliv_number, is_final, days_to_delivery, days_taken, is_active, contract_id) VALUES (3, TRUE , 20, 25, FALSE,11);
INSERT INTO Deliverable (deliv_number, is_final, days_to_delivery, days_taken, is_active, contract_id) VALUES (1, FALSE, 5 , 5, FALSE,16);
INSERT INTO Deliverable (deliv_number, is_final, days_to_delivery, days_taken, is_active, contract_id) VALUES (2, FALSE, 15, 15, FALSE,16);
INSERT INTO Deliverable (deliv_number, is_final, days_to_delivery, days_taken, is_active, contract_id) VALUES (3, FALSE, 20, 20, FALSE,16);
INSERT INTO Deliverable (deliv_number, is_final, days_to_delivery, days_taken, is_active, contract_id) VALUES (4, TRUE , 28, 28, FALSE,16);

INSERT INTO Assignment (is_active, contract_id, employee_id) VALUES (FALSE, 1, 21);
INSERT INTO Assignment (is_active, contract_id, employee_id) VALUES (FALSE, 2, 22);
INSERT INTO Assignment (is_active, contract_id, employee_id) VALUES (FALSE, 3, 23);
INSERT INTO Assignment (is_active, contract_id, employee_id) VALUES (FALSE, 4, 24);
INSERT INTO Assignment (is_active, contract_id, employee_id) VALUES (FALSE, 5, 25);
INSERT INTO Assignment (is_active, contract_id, employee_id) VALUES (FALSE, 6, 26);
INSERT INTO Assignment (is_active, contract_id, employee_id) VALUES (FALSE, 7, 27);
INSERT INTO Assignment (is_active, contract_id, employee_id) VALUES (FALSE, 8, 28);
INSERT INTO Assignment (is_active, contract_id, employee_id) VALUES (FALSE, 9, 29);
INSERT INTO Assignment (is_active, contract_id, employee_id) VALUES (FALSE, 10, 31);
INSERT INTO Assignment (is_active, contract_id, employee_id) VALUES (FALSE, 11, 32);
INSERT INTO Assignment (is_active, contract_id, employee_id) VALUES (FALSE, 12, 33);
INSERT INTO Assignment (is_active, contract_id, employee_id) VALUES (FALSE, 13, 34);
INSERT INTO Assignment (is_active, contract_id, employee_id) VALUES (FALSE, 14, 35);
INSERT INTO Assignment (is_active, contract_id, employee_id) VALUES (FALSE, 15, 36);
INSERT INTO Assignment (is_active, contract_id, employee_id) VALUES (FALSE, 16, 37);
INSERT INTO Assignment (is_active, contract_id, employee_id) VALUES (FALSE, 17, 38);
INSERT INTO Assignment (is_active, contract_id, employee_id) VALUES (FALSE, 18, 39);
INSERT INTO Assignment (is_active, contract_id, employee_id) VALUES (FALSE, 19, 39);
INSERT INTO Assignment (is_active, contract_id, employee_id) VALUES (FALSE, 20, 40);

INSERT INTO Work_Log (date_worked, hours_worked, assignment_id) VALUES ('2017-1-05', 073000, 1);
INSERT INTO Work_Log (date_worked, hours_worked, assignment_id) VALUES ('2017-1-05', 080000, 2);
INSERT INTO Work_Log (date_worked, hours_worked, assignment_id) VALUES ('2017-3-05', 073000, 3);
INSERT INTO Work_Log (date_worked, hours_worked, assignment_id) VALUES ('2017-1-06', 073000, 4);
INSERT INTO Work_Log (date_worked, hours_worked, assignment_id) VALUES ('2017-1-05', 073000, 5);
INSERT INTO Work_Log (date_worked, hours_worked, assignment_id) VALUES ('2017-6-05', 073000, 6);
INSERT INTO Work_Log (date_worked, hours_worked, assignment_id) VALUES ('2017-7-05', 073000, 7);
INSERT INTO Work_Log (date_worked, hours_worked, assignment_id) VALUES ('2017-7-05', 073000, 8);
INSERT INTO Work_Log (date_worked, hours_worked, assignment_id) VALUES ('2017-7-05', 073000, 9);
INSERT INTO Work_Log (date_worked, hours_worked, assignment_id) VALUES ('2017-7-05', 080000, 10);
INSERT INTO Work_Log (date_worked, hours_worked, assignment_id) VALUES ('2017-7-05', 073000, 11);
INSERT INTO Work_Log (date_worked, hours_worked, assignment_id) VALUES ('2017-7-05', 073000, 12);
INSERT INTO Work_Log (date_worked, hours_worked, assignment_id) VALUES ('2017-7-05', 073000, 13);
INSERT INTO Work_Log (date_worked, hours_worked, assignment_id) VALUES ('2017-7-05', 073000, 14);
INSERT INTO Work_Log (date_worked, hours_worked, assignment_id) VALUES ('2017-7-05', 073000, 15);
INSERT INTO Work_Log (date_worked, hours_worked, assignment_id) VALUES ('2017-8-05', 073000, 16);
INSERT INTO Work_Log (date_worked, hours_worked, assignment_id) VALUES ('2017-9-05', 073000, 17);
INSERT INTO Work_Log (date_worked, hours_worked, assignment_id) VALUES ('2017-10-05', 073000, 18);
INSERT INTO Work_Log (date_worked, hours_worked, assignment_id) VALUES ('2017-11-05', 073000, 19);
INSERT INTO Work_Log (date_worked, hours_worked, assignment_id) VALUES ('2017-12-05', 073000, 20);

INSERT INTO Supervises (manager_id, employee_id) VALUES (21, 41);
INSERT INTO Supervises (manager_id, employee_id) VALUES (21, 42);
INSERT INTO Supervises (manager_id, employee_id) VALUES (23, 43);
INSERT INTO Supervises (manager_id, employee_id) VALUES (21, 44);
INSERT INTO Supervises (manager_id, employee_id) VALUES (21, 45);
INSERT INTO Supervises (manager_id, employee_id) VALUES (6, 26);
INSERT INTO Supervises (manager_id, employee_id) VALUES (7, 27);
INSERT INTO Supervises (manager_id, employee_id) VALUES (8, 28);
INSERT INTO Supervises (manager_id, employee_id) VALUES (8, 29);
INSERT INTO Supervises (manager_id, employee_id) VALUES (10, 30);
INSERT INTO Supervises (manager_id, employee_id) VALUES (11, 31);
INSERT INTO Supervises (manager_id, employee_id) VALUES (11, 32);
INSERT INTO Supervises (manager_id, employee_id) VALUES (13, 33);
INSERT INTO Supervises (manager_id, employee_id) VALUES (13, 34);
INSERT INTO Supervises (manager_id, employee_id) VALUES (15, 35);
INSERT INTO Supervises (manager_id, employee_id) VALUES (16, 36);
INSERT INTO Supervises (manager_id, employee_id) VALUES (17, 37);
INSERT INTO Supervises (manager_id, employee_id) VALUES (18, 38);
INSERT INTO Supervises (manager_id, employee_id) VALUES (19, 39);
INSERT INTO Supervises (manager_id, employee_id) VALUES (20, 40);
