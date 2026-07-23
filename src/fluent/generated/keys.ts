import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    'atf-create-agent-user-a': {
                        table: 'sys_atf_step'
                        id: '27b1c04bdb174c80957ef0f805f2594a'
                    }
                    'atf-create-employee-user-a': {
                        table: 'sys_atf_step'
                        id: 'dd6b4e9328dd4cf099637268e47035b9'
                    }
                    'atf-ec-create-agent-user': {
                        table: 'sys_atf_step'
                        id: '5b171a95867a41348fb2e69e75ea7222'
                    }
                    'atf-ec-create-employee-user': {
                        table: 'sys_atf_step'
                        id: '9bb83f1fd19f4f25aa956507091e8e10'
                    }
                    'atf-ec-insert-case': {
                        table: 'sys_atf_step'
                        id: '40524751139342bbaec3b9ef93f0dda2'
                    }
                    'atf-ec-query-agent-role': {
                        table: 'sys_atf_step'
                        id: '4299b84072af48d9a88637927701f607'
                        deleted: true
                    }
                    'atf-ec-run-ui-flow': {
                        table: 'sys_atf_step'
                        id: '7d812babf8114834909fb06e29680cb7'
                    }
                    'atf-ec-seed-availability': {
                        table: 'sys_atf_step'
                        id: 'b0e90afc3a5341bdb3707024f199a0e0'
                    }
                    'atf-ec-test': {
                        table: 'sys_atf_test'
                        id: '2d744798268f42bb89772ae1cd91d089'
                    }
                    'atf-ec-validate-booked-appt': {
                        table: 'sys_atf_step'
                        id: 'aecc445621a04617b41abc2fe09f03b0'
                    }
                    'atf-insert-payroll-case-a': {
                        table: 'sys_atf_step'
                        id: '2c78554eab374104ad6ee2c6ea5725bd'
                    }
                    'atf-query-agent-role-a': {
                        table: 'sys_atf_step'
                        id: '74068a24f41a4f98ae0c3028476dcc5e'
                        deleted: true
                    }
                    'atf-run-scheduler-flow-a': {
                        table: 'sys_atf_step'
                        id: 'c4f30044cf164261aa5a520a446a76aa'
                    }
                    'atf-scheduler-api-test': {
                        table: 'sys_atf_test'
                        id: '2a37d3bc30844ce4a73cd0fe2126eed6'
                    }
                    'atf-seed-availability-a': {
                        table: 'sys_atf_step'
                        id: '4697d5ab704241ca8832412d4ff7d521'
                    }
                    'atf-tab-coverage-run': {
                        table: 'sys_atf_step'
                        id: 'c3713961fddd46328368c880da1f5d33'
                    }
                    'atf-tab-coverage-test': {
                        table: 'sys_atf_test'
                        id: 'fa8f5af9394b4b128fed07a1ea7c657f'
                    }
                    'atf-tab-exclusion-run': {
                        table: 'sys_atf_step'
                        id: 'eb0cdbe1efc940a280df04025ec8ede7'
                    }
                    'atf-tab-exclusion-test': {
                        table: 'sys_atf_test'
                        id: '35cc0ab441a14e20a542264d2bacffe3'
                    }
                    'atf-tab-idempotency-run': {
                        table: 'sys_atf_step'
                        id: '299dca68a3b24fcea81c0b120d39e61f'
                    }
                    'atf-tab-idempotency-test': {
                        table: 'sys_atf_test'
                        id: '7127b5e40a974585822b536af9323a89'
                    }
                    'atf-tab-order-run': {
                        table: 'sys_atf_step'
                        id: '35054d9dd31f473897517a8df1170825'
                    }
                    'atf-tab-order-test': {
                        table: 'sys_atf_test'
                        id: '131cfab2f5454760b206a0d7d2c22580'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: '27c6c30296d441358676878d9d004781'
                    }
                    br0: {
                        table: 'sys_script'
                        id: 'f0a2afc7e8f345f3869e4aaf5dc2a55e'
                    }
                    cs0: {
                        table: 'sys_script_client'
                        id: 'b91ae8836b7a4371972bc008dad0b1fc'
                    }
                    'hr-mtg-agenda-book': {
                        table: 'sys_ws_operation'
                        id: '4fbfd364930347c8b178ec88d82fb81a'
                    }
                    'hr-mtg-agenda-get': {
                        table: 'sys_ws_operation'
                        id: '276cd01163d949f38efe956839567734'
                    }
                    'hr-mtg-agenda-tab-automation': {
                        table: 'sys_script_include'
                        id: 'f2f7f6422abf47fe9fdd5de0acff2f98'
                    }
                    'hr-mtg-agenda-tab-daily-job': {
                        table: 'sysauto_script'
                        id: 'a6a725a9fc7f4e18adfb6d6d30b6163f'
                    }
                    'hr-mtg-agenda-tab-install-job': {
                        table: 'sysauto_script'
                        id: 'daa138913bc34742a88a2addd1906372'
                    }
                    'hr-mtg-agenda-widget': {
                        table: 'sp_widget'
                        id: '70badff0a1f849e3885fae70c7305a72'
                    }
                    'hr-mtg-scheduler-acl': {
                        table: 'sys_security_acl'
                        id: '53fd7ba6a40d4f8aa20a5c6a6c258923'
                    }
                    'hr-mtg-scheduler-api': {
                        table: 'sys_ws_definition'
                        id: '844823ba9f8c4260bbd8d8944c556fc8'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '4c7f5a5dce05494e83c85ff0bd55bf22'
                    }
                    src_server_hr_meeting_agendaService_ts: {
                        table: 'sys_module'
                        id: 'abd5d45f837441d192080d4f04e2220e'
                    }
                    src_server_hr_meeting_restHandlers_ts: {
                        table: 'sys_module'
                        id: 'ce2c70722bcf4962aeac408ae6263c18'
                    }
                    'src_server_hr_meeting_scheduled-scripts_hr-mtg-agenda-tab-daily_js': {
                        table: 'sys_module'
                        id: '76b4c4297300401baf1a7bdaee23f839'
                    }
                    'src_server_hr_meeting_scheduled-scripts_hr-mtg-agenda-tab-once_js': {
                        table: 'sys_module'
                        id: '7e8985e1948543b68159fc3a85f944b7'
                    }
                    'src_server_hr_meeting_script-includes_hr-mtg-agenda-tab-automation_js': {
                        table: 'sys_module'
                        id: 'd52abf51517d49c3a6e095c861f88b52'
                    }
                    src_server_hr_meeting_slotEngine_ts: {
                        table: 'sys_module'
                        id: '9fde810e290643be94ba81edef60b046'
                    }
                    'src_server_hr_meeting_sp_widget_agenda-widget_client_js': {
                        table: 'sys_module'
                        id: '6e30a3438be14fda971645d6ddd42363'
                    }
                    'src_server_hr_meeting_sp_widget_agenda-widget_server_js': {
                        table: 'sys_module'
                        id: 'b819cac2fee9446b935ea0078164d7b1'
                    }
                    src_server_hr_meeting_tables_ts: {
                        table: 'sys_module'
                        id: '27b2c2e503364b869b7af2d7af76ab4f'
                    }
                    src_server_script_ts: {
                        table: 'sys_module'
                        id: '8cd533e86b7d43fa8724bba3e61f7dfb'
                    }
                }
                composite: [
                    {
                        table: 'sys_variable_value'
                        id: '01782c9a456c497689ba8d13afaf2f5f'
                        key: {
                            document_key: 'dd6b4e9328dd4cf099637268e47035b9'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '01851ec6146f4803b6cd2ad037d8d8e6'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'status'
                            value: 'completed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '0308d83de81e45b6b5d80b04ee3f94b4'
                        key: {
                            application_file: '8e79518e55e744d48a4821b97dd6f082'
                            source_artifact: '70faaf644cf747b5af37802f2c8ad20a'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '03339288c3d6c7500deb9e377d013187'
                        key: {
                            name: 'u_hr_mtg_availability'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '03339288c3d6c7500deb9e377d0131b0'
                        key: {
                            name: 'u_hr_mtg_appointment'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '0438870252274a92a65c23d55800cc3d'
                        key: {
                            sys_security_acl: 'e0979b1d74e84a88bf30275881b40b79'
                            sys_user_role: {
                                id: '254aeb7e4b8c41248cd58219f2a850a8'
                                key: {
                                    name: 'global.hr_mtg_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '0479da82eae74e718c8f80efb017da67'
                        key: {
                            name: 'global.hr_mtg_agent'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '04fa04aa80dd4e988fa5daddcdc7310a'
                        key: {
                            name: 'u_hr_mtg_appointment'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '05c8b99d1ae4430a948cf30085da3683'
                        key: {
                            sys_ui_section: {
                                id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    caption: 'General'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'hr_agent'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '061bf82c8bc341fa80fbe8e11a4c7dcf'
                        key: {
                            sys_ui_section: {
                                id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    caption: 'General'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'notes'
                            position: '11'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '082b43c4483a4392bd286d07c04fcfe4'
                        key: {
                            sys_ui_section: {
                                id: 'e4ee54468a054fd0936b747356272c4d'
                                key: {
                                    name: 'u_hr_mtg_availability'
                                    caption: 'General'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'date'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '0a51a5231e26479380d84808af363b18'
                        key: {
                            category: 'u_hr_mtg_appointment'
                            prefix: 'APPT'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '0aa65dfdd185431e9180b9d4e857300b'
                        key: {
                            document_key: '35054d9dd31f473897517a8df1170825'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '0aee0ae3437547e4bf7960e73ca30504'
                        deleted: true
                        key: {
                            document_key: '74068a24f41a4f98ae0c3028476dcc5e'
                            variable: '02fb0027531000109e02ddeeff7b120b'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0cefb27b40454f9b94b636c702012774'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'day_of_week'
                            value: 'saturday'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '13d1c01abdb1470dbc862b2e74fa9f38'
                        key: {
                            name: 'u_hr_mtg_availability'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '14b4d823cf154f79b9eaeff76d3d9cd8'
                        key: {
                            document_key: '4697d5ab704241ca8832412d4ff7d521'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '15d992aa1d3a4c9786b66c9f4b4accb1'
                        key: {
                            document_key: 'c3713961fddd46328368c880da1f5d33'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '1783da01ff7d4528bf29ab3e65a3a5ad'
                        key: {
                            sys_security_acl: 'e0979b1d74e84a88bf30275881b40b79'
                            sys_user_role: {
                                id: '0479da82eae74e718c8f80efb017da67'
                                key: {
                                    name: 'global.hr_mtg_agent'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '18377e417ac54bd188fc4ddf15c0ed6a'
                        key: {
                            document_key: '9bb83f1fd19f4f25aa956507091e8e10'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '183a4ec6c1ac4dc68a5f658972485451'
                        key: {
                            sys_ui_section: {
                                id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    caption: 'General'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '10'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '1a378850dca44dda94326ba6b9d1a3b8'
                        key: {
                            document_key: 'b0e90afc3a5341bdb3707024f199a0e0'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '20286e40dbd74c14bac4e007f05d1775'
                        key: {
                            document_key: '40524751139342bbaec3b9ef93f0dda2'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '21616b4c36d34254b720592bd198937a'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '217bc2cd0659458d899052353624ecc5'
                        key: {
                            document_key: '5b171a95867a41348fb2e69e75ea7222'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '23bf32922d7b41acad3f97658f1fc5c4'
                        key: {
                            field: 'script'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            id: '4697d5ab704241ca8832412d4ff7d521'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '241b77870c314eaeb2e61ed85f3341f2'
                        key: {
                            document_key: '9bb83f1fd19f4f25aa956507091e8e10'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '2459234dcae74508bb12b27f98fbf981'
                        key: {
                            sys_ui_section: {
                                id: 'e4ee54468a054fd0936b747356272c4d'
                                key: {
                                    name: 'u_hr_mtg_availability'
                                    caption: 'General'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'day_of_week'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '254aeb7e4b8c41248cd58219f2a850a8'
                        key: {
                            name: 'global.hr_mtg_admin'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '262851ad7f154d078d206c8972a3f37a'
                        key: {
                            sys_ui_form: {
                                id: '9a58a3903aaa495bb3f79201ffcc4c89'
                                key: {
                                    name: 'u_hr_mtg_availability'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: 'e4ee54468a054fd0936b747356272c4d'
                                key: {
                                    name: 'u_hr_mtg_availability'
                                    caption: 'General'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '27087c5a364c448fa9e7b1c9ea708fa3'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'status'
                            value: 'no_show'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '286d438d8cab47f7bc73efb79491b3c8'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'meeting_type'
                            value: 'in_person'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '29cd8723fdd3482ea1c365adb09cc3a9'
                        key: {
                            sys_ui_section: {
                                id: 'e4ee54468a054fd0936b747356272c4d'
                                key: {
                                    name: 'u_hr_mtg_availability'
                                    caption: 'General'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2a49dc92b66546c79a846477c587c84f'
                        key: {
                            document_key: '9bb83f1fd19f4f25aa956507091e8e10'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2c9e2f926b7245d683db2c9337d4a4ba'
                        key: {
                            document_key: '5b171a95867a41348fb2e69e75ea7222'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2d3747bed028499fbe506a03344bbab3'
                        key: {
                            document_key: '27b1c04bdb174c80957ef0f805f2594a'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '2da2bfcd511e4936b7ba96a6a76cd293'
                        key: {
                            field: 'script'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            id: 'aecc445621a04617b41abc2fe09f03b0'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2fc7d6e5d66a445a8168492fe1f2fb08'
                        key: {
                            document_key: '27b1c04bdb174c80957ef0f805f2594a'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '3012b315c8974a1cb26d75230af8ea96'
                        key: {
                            field: 'script'
                            table: 'var__m_atf_input_variable_bfb48f59ffdf3210f972ffffffffffb3'
                            id: '7d812babf8114834909fb06e29680cb7'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3048e354120942c687c96d6666d4654c'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'day_of_week'
                            value: 'wednesday'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '3166207c7e064195b404910285d60b5c'
                        key: {
                            document_key: '2c78554eab374104ad6ee2c6ea5725bd'
                            variable: '9024a37f671003007ba405225685efe5'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '319552f0c93143489ce2c3dfaf88d7d5'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '3335bc9ff1fc4fd69e63e6365e3eabd1'
                        key: {
                            document_key: '2c78554eab374104ad6ee2c6ea5725bd'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '34f2b6baa6cc415d9c5a133588711da4'
                        key: {
                            document_key: 'dd6b4e9328dd4cf099637268e47035b9'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3716f91f51454459bac424c0d2dcbb30'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'day_of_week'
                            value: 'thursday'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '37e6665e96cf493396c4805d78c72086'
                        key: {
                            sys_security_acl: '502afd694c7644949ad0bee46492c30f'
                            sys_user_role: {
                                id: '254aeb7e4b8c41248cd58219f2a850a8'
                                key: {
                                    name: 'global.hr_mtg_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '3a5a35575ec946629c2bc4cac341fe92'
                        key: {
                            document_key: 'dd6b4e9328dd4cf099637268e47035b9'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '3c80b6e3499044818a393d1bb5da4638'
                        key: {
                            application_file: 'a99c6de7b4024ae7a823557d13040a6e'
                            source_artifact: '70faaf644cf747b5af37802f2c8ad20a'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '3cfd7fa895e444b6b10e8ad9a4a96686'
                        key: {
                            document_key: '2c78554eab374104ad6ee2c6ea5725bd'
                            variable: '90144b535320220002c6435723dc3488'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3e339288c3d6c7500deb9e377d013157'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4365a5020a5f418f8e93026a437b6561'
                        key: {
                            sys_security_acl: '502afd694c7644949ad0bee46492c30f'
                            sys_user_role: {
                                id: '0479da82eae74e718c8f80efb017da67'
                                key: {
                                    name: 'global.hr_mtg_agent'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '4540740e0cc44d4c9fe776f2420ca72f'
                        deleted: true
                        key: {
                            document_key: '74068a24f41a4f98ae0c3028476dcc5e'
                            variable: '78b8d86b531000109e02ddeeff7b12f3'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '4680888f29f44ac2982b9bc7a84ce77f'
                        key: {
                            application_file: 'a17cdce7a3414ea0b61c198d1812709c'
                            source_artifact: '70faaf644cf747b5af37802f2c8ad20a'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '46f979a219c2435199aed3e333a7f091'
                        key: {
                            document_key: '40524751139342bbaec3b9ef93f0dda2'
                            variable: '9024a37f671003007ba405225685efe5'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '4799af8bd5ed45a2945bfe73e3572fb2'
                        key: {
                            sys_ui_section: {
                                id: 'e4ee54468a054fd0936b747356272c4d'
                                key: {
                                    name: 'u_hr_mtg_availability'
                                    caption: 'General'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'end_time'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4c220076eea94f41b6f7f70bc0bf92af'
                        key: {
                            sys_security_acl: '4792c4e1f0cc4a40b420b1167d69b3f9'
                            sys_user_role: {
                                id: 'c6d80d0f63f64f84b3d7575d9b0c497d'
                                key: {
                                    name: 'global.hr_mtg_employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4d35f51aa4714507816c836533babad4'
                        key: {
                            sys_security_acl: '4792c4e1f0cc4a40b420b1167d69b3f9'
                            sys_user_role: {
                                id: '254aeb7e4b8c41248cd58219f2a850a8'
                                key: {
                                    name: 'global.hr_mtg_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '4ed87947c3e342a281793f535776447f'
                        key: {
                            document_key: 'c3713961fddd46328368c880da1f5d33'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '509cc39c1fde499d8929c5c41b9d9223'
                        key: {
                            document_key: '299dca68a3b24fcea81c0b120d39e61f'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '531966036a6d432d87730d596bbb692e'
                        key: {
                            document_key: '27b1c04bdb174c80957ef0f805f2594a'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '569266bd8d6d423da1ea67b0a6eee81a'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'meeting_type'
                            value: 'call'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '57893ea2b5bc4d05b0b68c50b3c2e562'
                        key: {
                            document_key: 'dd6b4e9328dd4cf099637268e47035b9'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5a99d0789af543c89af63a731a061bd3'
                        key: {
                            document_key: 'dd6b4e9328dd4cf099637268e47035b9'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '5a9c08453fe648eeb86ee44cf2e9d979'
                        key: {
                            sys_ui_section: {
                                id: 'e4ee54468a054fd0936b747356272c4d'
                                key: {
                                    name: 'u_hr_mtg_availability'
                                    caption: 'General'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'agent'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '5b88d366912943fda7f538805921bfeb'
                        key: {
                            field: 'field_values'
                            table: 'var__m_atf_input_variable_14872288df60220062fe6c7a4df26319'
                            id: '40524751139342bbaec3b9ef93f0dda2'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '6343c70a3a3f4fbfb35b760c365f6f84'
                        key: {
                            document_key: '5b171a95867a41348fb2e69e75ea7222'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '6514dac3654b433f8ba471f4b65eddff'
                        deleted: true
                        key: {
                            document_key: '74068a24f41a4f98ae0c3028476dcc5e'
                            variable: 'b86c0427531000109e02ddeeff7b1227'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '655a3a5b9d78421f844b6e9701298e34'
                        key: {
                            sys_security_acl: 'f484328ebd8241c8bab6025c3415539b'
                            sys_user_role: {
                                id: '0479da82eae74e718c8f80efb017da67'
                                key: {
                                    name: 'global.hr_mtg_agent'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '66929b1a6637428fbb8479993ab6d421'
                        key: {
                            document_key: 'eb0cdbe1efc940a280df04025ec8ede7'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '68e66ccc8de54dd886ab8b8440fd3e50'
                        key: {
                            sys_security_acl: '4792c4e1f0cc4a40b420b1167d69b3f9'
                            sys_user_role: {
                                id: '0479da82eae74e718c8f80efb017da67'
                                key: {
                                    name: 'global.hr_mtg_agent'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '6b4d5f524a454a088b7da41157b6b0d1'
                        key: {
                            sys_security_acl: '76fe3295fdf04ccf97397bb909c19d6b'
                            sys_user_role: {
                                id: '254aeb7e4b8c41248cd58219f2a850a8'
                                key: {
                                    name: 'global.hr_mtg_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact'
                        id: '70faaf644cf747b5af37802f2c8ad20a'
                        key: {
                            name: 'hr_meeting_scheduler.do - BYOUI Files'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7107df40693445a4a8014cff7ce525bd'
                        key: {
                            document_key: '27b1c04bdb174c80957ef0f805f2594a'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '710f0e4495f648b6b5c0b6e1685b156d'
                        key: {
                            sys_ui_section: {
                                id: 'e4ee54468a054fd0936b747356272c4d'
                                key: {
                                    name: 'u_hr_mtg_availability'
                                    caption: 'General'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'active'
                            position: '9'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '74b66322c98f459189acedd381dc386a'
                        key: {
                            sys_ui_section: {
                                id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    caption: 'General'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'hr_case'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '75f57cf5d47c46a0b810ac35c03699ed'
                        key: {
                            document_key: '40524751139342bbaec3b9ef93f0dda2'
                            variable: '90144b535320220002c6435723dc3488'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '766cffd715714ef696340f2c5be58f16'
                        key: {
                            sys_ui_section: {
                                id: 'e4ee54468a054fd0936b747356272c4d'
                                key: {
                                    name: 'u_hr_mtg_availability'
                                    caption: 'General'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_ui_list'
                        id: '7b641a4cc3d6c7500deb9e377d013152'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                            element: 'NULL'
                            relationship: 'NULL'
                            parent: 'NULL'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7b80c4fb6ecd4f1c89f6129c0cb7e380'
                        key: {
                            document_key: 'c4f30044cf164261aa5a520a446a76aa'
                            variable: 'e216835dffdf3210f972ffffffffff53'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7d6991fa61bb4bb3b3f2d3df6ec251b6'
                        key: {
                            document_key: '27b1c04bdb174c80957ef0f805f2594a'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7fec36d80c704d0993293f8eaad837fc'
                        key: {
                            document_key: '5b171a95867a41348fb2e69e75ea7222'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '802c698af42f4742b7d30f131ff57808'
                        key: {
                            sys_ui_section: {
                                id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    caption: 'General'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'date'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '84d8121d4f2c45fb958f59e477301f05'
                        key: {
                            sys_ui_section: {
                                id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    caption: 'General'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '886461ed31c240e19481854fe3ee6342'
                        key: {
                            sys_security_acl: '8ba1122abedc4acaa04413d54002fc7b'
                            sys_user_role: {
                                id: '254aeb7e4b8c41248cd58219f2a850a8'
                                key: {
                                    name: 'global.hr_mtg_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8a6e80fb6664409bb6579c1b22452003'
                        key: {
                            sys_ui_section: {
                                id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    caption: 'General'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'employee'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '8bd3e82e995c41688b29f2b7dcc5341f'
                        deleted: true
                        key: {
                            document_key: '4299b84072af48d9a88637927701f607'
                            variable: '02fb0027531000109e02ddeeff7b120b'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8c8c9b255f01472dbac139b16a4f3dfb'
                        key: {
                            sys_ui_section: {
                                id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    caption: 'General'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'cancellation_reason'
                            position: '12'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '8c8e3e737eba454ab18b0c731e57c6a0'
                        key: {
                            document_key: '5b171a95867a41348fb2e69e75ea7222'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '8d0c4031a63c4e868fc12e9745a8f625'
                        key: {
                            sys_security_acl: '94f447ed81c5445d9be96a40083a4efb'
                            sys_user_role: {
                                id: '254aeb7e4b8c41248cd58219f2a850a8'
                                key: {
                                    name: 'global.hr_mtg_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '8e79518e55e744d48a4821b97dd6f082'
                        key: {
                            name: 'hr_meeting_scheduler'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: '8e86d81f388b4fb8bb087b9d9ec19ab0'
                        key: {
                            role: {
                                id: '254aeb7e4b8c41248cd58219f2a850a8'
                                key: {
                                    name: 'global.hr_mtg_admin'
                                }
                            }
                            contains: {
                                id: '0479da82eae74e718c8f80efb017da67'
                                key: {
                                    name: 'global.hr_mtg_agent'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8e9b89b2136f4af6a8c941aac0c63169'
                        key: {
                            sys_ui_section: {
                                id: 'e4ee54468a054fd0936b747356272c4d'
                                key: {
                                    name: 'u_hr_mtg_availability'
                                    caption: 'General'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'recurring'
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8f5adcad37af4c168a213c73ad48d9c7'
                        key: {
                            sys_ui_section: {
                                id: 'e4ee54468a054fd0936b747356272c4d'
                                key: {
                                    name: 'u_hr_mtg_availability'
                                    caption: 'General'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'start_time'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '90fcd0c22000451893f4b3f7e5423f32'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'meeting_type'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '92fdaed84b0241fc90d754decd3ad9de'
                        key: {
                            sys_security_acl: 'f484328ebd8241c8bab6025c3415539b'
                            sys_user_role: {
                                id: '254aeb7e4b8c41248cd58219f2a850a8'
                                key: {
                                    name: 'global.hr_mtg_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '95f27e2482064699b88b69c5430095e9'
                        key: {
                            document_key: '5b171a95867a41348fb2e69e75ea7222'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '9a58a3903aaa495bb3f79201ffcc4c89'
                        key: {
                            name: 'u_hr_mtg_availability'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '9d35432e59334b05a9a472595519c8ab'
                        key: {
                            document_key: '27b1c04bdb174c80957ef0f805f2594a'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'a00324c4c2fd44e99e3063477d8997ad'
                        key: {
                            sys_ui_section: {
                                id: 'e4ee54468a054fd0936b747356272c4d'
                                key: {
                                    name: 'u_hr_mtg_availability'
                                    caption: 'General'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'a17cdce7a3414ea0b61c198d1812709c'
                        key: {
                            name: 'global/main'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a5464c9852304327a4cbe987fc626b80'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'day_of_week'
                            value: 'monday'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'a77b9da368ef4b2888e7da15e5f48a31'
                        key: {
                            sys_ui_section: {
                                id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    caption: 'General'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'end_time'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'a99c6de7b4024ae7a823557d13040a6e'
                        key: {
                            name: 'global/main.js.map'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'aa57ed60eccb41899f2aa276f8f97356'
                        key: {
                            sys_ui_section: {
                                id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    caption: 'General'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'ae583d56c6d34fbc9cff3be43072659c'
                        key: {
                            document_key: '9bb83f1fd19f4f25aa956507091e8e10'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'af9a332c296a42b9a73ea53ef29ea18a'
                        key: {
                            document_key: '5b171a95867a41348fb2e69e75ea7222'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b19873af84cc46d4b2b55eb1aec0512f'
                        key: {
                            document_key: '9bb83f1fd19f4f25aa956507091e8e10'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b1c3b5c017cb4b24855322816dab1612'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b1db991bb3df48beb91a38794ee975bb'
                        key: {
                            document_key: 'aecc445621a04617b41abc2fe09f03b0'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b3c6557b65e74a3ea392fbe8e8cca745'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'day_of_week'
                            value: 'sunday'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'b3db37400d7f4530997b6973cb5d8e48'
                        key: {
                            sys_security_acl: '6160342a3a8a41dd94019fffb269df30'
                            sys_user_role: {
                                id: '0479da82eae74e718c8f80efb017da67'
                                key: {
                                    name: 'global.hr_mtg_agent'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'b7641a4cc3d6c7500deb9e377d013153'
                        key: {
                            list_id: {
                                id: '7b641a4cc3d6c7500deb9e377d013152'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'sys_created_on'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b8b7343754e5458b82b427db4458fe67'
                        key: {
                            document_key: '299dca68a3b24fcea81c0b120d39e61f'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b9899e8ab3e9490fa886a61a6a1eca04'
                        deleted: true
                        key: {
                            document_key: '4299b84072af48d9a88637927701f607'
                            variable: 'b86c0427531000109e02ddeeff7b1227'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'ba5514204dbe4bec9dc8e9d5832a43a6'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'day_of_week'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'baff572f78e24b9baea4cb4576d296e8'
                        key: {
                            sys_ui_section: {
                                id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    caption: 'General'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'start_time'
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'bb8d6c181ced40048fbc1d32a9a028a3'
                        key: {
                            document_key: '35054d9dd31f473897517a8df1170825'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'c1c1e2928ee7470ea852bc83f8edd59b'
                        key: {
                            sys_security_acl: '8ba1122abedc4acaa04413d54002fc7b'
                            sys_user_role: {
                                id: 'c6d80d0f63f64f84b3d7575d9b0c497d'
                                key: {
                                    name: 'global.hr_mtg_employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c2707202d6fd4e48962efae7708d26e3'
                        key: {
                            document_key: '40524751139342bbaec3b9ef93f0dda2'
                            variable: 'e6e3c7535320220002c6435723dc3496'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c4ebd69c4c6e48e0899cbb9d947033db'
                        key: {
                            document_key: '7d812babf8114834909fb06e29680cb7'
                            variable: 'e216835dffdf3210f972ffffffffff53'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c51e826808774c0399d84c5ec0e053d1'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'meeting_type'
                            value: 'video'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'c636eb8229be4bd3b9b3a64c3e50b68a'
                        key: {
                            field: 'script'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            id: 'b0e90afc3a5341bdb3707024f199a0e0'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'c6d80d0f63f64f84b3d7575d9b0c497d'
                        key: {
                            name: 'global.hr_mtg_employee'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c7848c0dbe3f45339dedad52a5e0a1ec'
                        key: {
                            document_key: '9bb83f1fd19f4f25aa956507091e8e10'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c9beb9d39c63465d97e976bd02ebc8ad'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'day_of_week'
                            value: 'tuesday'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'ca67e377c4824625b56aecddfaf30377'
                        key: {
                            document_key: 'dd6b4e9328dd4cf099637268e47035b9'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cf339288c3d6c7500deb9e377d01318f'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'cfaebb3282b649278282423cab916c90'
                        key: {
                            document_key: 'dd6b4e9328dd4cf099637268e47035b9'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd2eafb07c92a46c8ae1a2bee826c65ff'
                        deleted: true
                        key: {
                            document_key: '4299b84072af48d9a88637927701f607'
                            variable: '915990ab531000109e02ddeeff7b12f8'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'd51e2ac3120a4b8cb338c7df6d7da4b0'
                        key: {
                            sys_ui_form: {
                                id: '21616b4c36d34254b720592bd198937a'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    caption: 'General'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd6e3394a548b4e38b11d3cdd89d45f45'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'status'
                            value: 'booked'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'd73fc913169648f58da2a9e925aaa90f'
                        key: {
                            sys_ui_section: {
                                id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    caption: 'General'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'meeting_type'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ddf2d9ad5c01412f900e759891fe8511'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'status'
                            value: 'cancelled'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'df4a3172decf436f98113e7afa9a55fd'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'day_of_week'
                            value: 'friday'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'e01367295bfa4b869b77ea2376ba6487'
                        key: {
                            document_key: 'eb0cdbe1efc940a280df04025ec8ede7'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'e22fc98779884efb83551f6be653af36'
                        key: {
                            field: 'script'
                            table: 'var__m_atf_input_variable_bfb48f59ffdf3210f972ffffffffffb3'
                            id: 'c4f30044cf164261aa5a520a446a76aa'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'e322414a30a9439a8165cadf67d87317'
                        key: {
                            document_key: '9bb83f1fd19f4f25aa956507091e8e10'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'e4ee54468a054fd0936b747356272c4d'
                        key: {
                            name: 'u_hr_mtg_availability'
                            caption: 'General'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: 'ed003c218f6f486eb1b152d1a1fb3c33'
                        key: {
                            role: {
                                id: '0479da82eae74e718c8f80efb017da67'
                                key: {
                                    name: 'global.hr_mtg_agent'
                                }
                            }
                            contains: {
                                id: 'c6d80d0f63f64f84b3d7575d9b0c497d'
                                key: {
                                    name: 'global.hr_mtg_employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'ed830685527a4d3b824bd03e7da4c29b'
                        deleted: true
                        key: {
                            document_key: '74068a24f41a4f98ae0c3028476dcc5e'
                            variable: '915990ab531000109e02ddeeff7b12f8'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ef9560c8d855468798268ce4cf83c963'
                        key: {
                            sys_security_acl: '8ba1122abedc4acaa04413d54002fc7b'
                            sys_user_role: {
                                id: '0479da82eae74e718c8f80efb017da67'
                                key: {
                                    name: 'global.hr_mtg_agent'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'ef9b7c55da39411a98388bc659e50845'
                        key: {
                            sys_ui_section: {
                                id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    caption: 'General'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'status'
                            position: '9'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'f1e7bca6cfeb4c41b885b025eb5934ce'
                        key: {
                            sys_security_acl: '6160342a3a8a41dd94019fffb269df30'
                            sys_user_role: {
                                id: 'c6d80d0f63f64f84b3d7575d9b0c497d'
                                key: {
                                    name: 'global.hr_mtg_employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_number'
                        id: 'f292c174b9f748ba9b80f1a1aa12e41e'
                        key: {
                            category: 'u_hr_mtg_availability'
                            prefix: 'AVAIL'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f490beb6146f4ac2ba5af0278df73dd5'
                        deleted: true
                        key: {
                            document_key: '4299b84072af48d9a88637927701f607'
                            variable: '78b8d86b531000109e02ddeeff7b12f3'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f5d1a07cc3844f74be89c0b9fa1e755e'
                        key: {
                            document_key: 'aecc445621a04617b41abc2fe09f03b0'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f6c5b6297fa348ae9d5715eee69b0d88'
                        key: {
                            document_key: '2c78554eab374104ad6ee2c6ea5725bd'
                            variable: 'e6e3c7535320220002c6435723dc3496'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f81afd04859d42aaa9826cc75b983202'
                        key: {
                            document_key: 'b0e90afc3a5341bdb3707024f199a0e0'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            caption: 'General'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f91397a08bb34195bb2ec04d6e50f615'
                        key: {
                            document_key: '27b1c04bdb174c80957ef0f805f2594a'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'f92f6f5cf75e457ea28872d835110049'
                        key: {
                            sys_security_acl: '6160342a3a8a41dd94019fffb269df30'
                            sys_user_role: {
                                id: '254aeb7e4b8c41248cd58219f2a850a8'
                                key: {
                                    name: 'global.hr_mtg_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'fb8191fce3bd4c7b8129014f75d5878a'
                        key: {
                            field: 'field_values'
                            table: 'var__m_atf_input_variable_14872288df60220062fe6c7a4df26319'
                            id: '2c78554eab374104ad6ee2c6ea5725bd'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'fc7b93a5db3442db82c4993f18dff2a3'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'ff5860e751394775968bb0d96d7b451b'
                        key: {
                            document_key: '4697d5ab704241ca8832412d4ff7d521'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                ]
            }
        }
    }
}
